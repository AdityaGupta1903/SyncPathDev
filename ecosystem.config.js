module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "run start",
      cwd: "./apps/web",
      watch: true,
    },
    {
      name: "nest-app",
      script: "npm",
      args: "run start",
      cwd: "./apps/start:prod",
      watch: true,
    },
  ],
};
