const OBJECT_ID_PATTERN = /^[a-fA-F0-9]{24}$/;

function isValidObjectId(id) {
  return typeof id === "string" && OBJECT_ID_PATTERN.test(id);
}

function pickFields(source, allowedFields) {
  if (!source || typeof source !== "object") {
    return {};
  }

  return allowedFields.reduce((picked, field) => {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      picked[field] = source[field];
    }
    return picked;
  }, {});
}

function requireObjectId(res, id, label = "id") {
  if (isValidObjectId(id)) {
    return true;
  }

  res.status(400).json({ message: `Invalid ${label}` });
  return false;
}

function handleError(res, err, statusCode = 400) {
  const message = err && err.message ? err.message : "Invalid request";
  return res.status(statusCode).json({ message });
}

module.exports = {
  handleError,
  isValidObjectId,
  pickFields,
  requireObjectId,
};
