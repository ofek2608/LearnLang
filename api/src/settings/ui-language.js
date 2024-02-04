const LANGUAGES = [
  "en_us",
];

function verifyValue({ userId, settings, value }) {
  return LANGUAGES.indexOf(value) >= 0;
};

function getDefault({ userId, settings }) {
  return LANGUAGES[0];
}

export default {verifyValue, getDefault};