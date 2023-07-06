const dotenvExpand = require("dotenv-expand");
const dotenvFiles = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.production.local",
];

dotenvFiles.forEach((dotenvFile) => {
  require("dotenv").config({
    path: dotenvFile,
  });

  dotenvExpand(
    require("dotenv").config({
      path: dotenvFile,
    })
  );
});

module.exports = {
  API_URL: process.env.API_URL,
  // Add other environment variables you need here
};
