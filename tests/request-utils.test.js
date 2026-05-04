const assert = require("node:assert/strict");
const test = require("node:test");

const { isValidObjectId, pickFields } = require("../utils/request-utils");

test("isValidObjectId accepts only 24-character hex object ids", () => {
  assert.equal(isValidObjectId("507f1f77bcf86cd799439011"), true);
  assert.equal(isValidObjectId("507f1f77bcf86cd79943901"), false);
  assert.equal(isValidObjectId("not-an-object-id"), false);
  assert.equal(isValidObjectId({ $ne: null }), false);
});

test("pickFields keeps allowed fields and drops unknown or operator-like keys", () => {
  const input = {
    username: "boyd",
    email: "boyd@example.com",
    role: "admin",
    $set: { email: "attacker@example.com" },
    _id: "507f1f77bcf86cd799439011",
  };

  assert.deepEqual(pickFields(input, ["username", "email"]), {
    username: "boyd",
    email: "boyd@example.com",
  });
});
