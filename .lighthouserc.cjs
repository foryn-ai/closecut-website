module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ["/", "/therapy", "/about", "/contact", "/intensive", "/resources"],
      startServerCommand: "npm run dev",
      startServerReadyPattern: "started server",
      startServerReadyTimeout: 60000,
      settings: {
        preset: "desktop",
        throttlingMethod: "simulate",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "artifacts/lighthouse",
    },
  },
};
