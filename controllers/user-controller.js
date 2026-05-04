const { User, Thought } = require("../models");
const {
  handleError,
  pickFields,
  requireObjectId,
} = require("../utils/request-utils");

const USER_FIELDS = ["username", "email"];

const userController = {
  async getAllUser(req, res) {
    try {
      const dbUserData = await User.find({})
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getUserById({ params }, res) {
    if (!requireObjectId(res, params.id, "user id")) {
      return;
    }

    try {
      const dbUserData = await User.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");

      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this id" });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async createUser({ body }, res) {
    try {
      const dbUserData = await User.create(pickFields(body, USER_FIELDS));
      res.status(201).json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async updateUser({ params, body }, res) {
    if (!requireObjectId(res, params.id, "user id")) {
      return;
    }

    try {
      const update = pickFields(body, USER_FIELDS);
      const dbUserData = await User.findOneAndUpdate({ _id: params.id }, update, {
        new: true,
        runValidators: true,
      });

      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async deleteUser({ params }, res) {
    if (!requireObjectId(res, params.id, "user id")) {
      return;
    }

    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.id });

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      handleError(res, err);
    }
  },

  async addFriend({ params }, res) {
    if (
      !requireObjectId(res, params.userId, "user id") ||
      !requireObjectId(res, params.friendId, "friend id")
    ) {
      return;
    }

    if (params.userId === params.friendId) {
      return res.status(400).json({ message: "User cannot friend themselves" });
    }

    try {
      const friendExists = await User.exists({ _id: params.friendId });

      if (!friendExists) {
        return res.status(404).json({ message: "No friend user with this id" });
      }

      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidators: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id" });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async removeFriend({ params }, res) {
    if (
      !requireObjectId(res, params.userId, "user id") ||
      !requireObjectId(res, params.friendId, "friend id")
    ) {
      return;
    }

    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = userController;
