function verifyValue({ userId, settings, value }) {
  if (typeof value !== "string") {
    return false;
  }
  if (value.length < 2 || 20 < value.length) {
    return false;
  }
  if (value.includes('.')) {
    return false;
  }
  return true;
};

function getDefault({ userId, settings }) {
  return userId;
}

export default {verifyValue, getDefault};