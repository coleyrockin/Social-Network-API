const { Thought, User } = require("../models");
const {
  handleError,
  pickFields,
  requireObjectId,
} = require("../utils/request-utils");

const THOUGHT_FIELDS = ["thoughtText", "username"];
const REACTION_FIELDS = ["reactionBody", "username"];

const thoughtController = {
  async getAllThought(req, res) {
    try {
      const dbThoughtData = await Thought.find({})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getThoughtById({ params }, res) {
    if (!requireObjectId(res, params.id, "thought id")) {
      return;
    }

    try {
      const dbThoughtData = await Thought.findOne({ _id: params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async createThought({ body }, res) {
    if (!requireObjectId(res, body.userId, "user id")) {
      return;
    }

    try {
      const user = await User.findById(body.userId);

      if (!user) {
        return res.status(404).json({ message: "No user with this id" });
      }

      const thought = await Thought.create(pickFields(body, THOUGHT_FIELDS));
      user.thoughts.push(thought._id);
      await user.save();

      res.status(201).json(thought);
    } catch (err) {
      handleError(res, err);
    }
  },

  async updateThought({ params, body }, res) {
    if (!requireObjectId(res, params.id, "thought id")) {
      return;
    }

    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.id },
        pickFields(body, THOUGHT_FIELDS),
        {
          new: true,
          runValidators: true,
        }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought found with this id" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async deleteThought({ params }, res) {
    if (!requireObjectId(res, params.id, "thought id")) {
      return;
    }

    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: params.id });

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id" });
      }

      await User.updateMany(
        { thoughts: params.id },
        { $pull: { thoughts: params.id } }
      );

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      handleError(res, err);
    }
  },

  async addReaction({ params, body }, res) {
    if (!requireObjectId(res, params.thoughtId, "thought id")) {
      return;
    }

    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: pickFields(body, REACTION_FIELDS) } },
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async removeReaction({ params }, res) {
    if (
      !requireObjectId(res, params.thoughtId, "thought id") ||
      !requireObjectId(res, params.reactionId, "reaction id")
    ) {
      return;
    }

    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        {
          _id: params.thoughtId,
          "reactions.reactionId": params.reactionId,
        },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No matching reaction found" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = thoughtController;
