module.exports = {
  "files": ["./**/*.{ts,tsx}"],
  "formats": [
    {
      "name": "json",
      "output": "file",
      "path": "report/eslint-report.json"
    },
    {
      "name": "gitlab",
      "output": "console"
    }
  ],
  "cliEngineConfig": {
    "errorOnUnmatchedPattern": false
  }
};
