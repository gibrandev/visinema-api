module.exports = {
    apps: [
        {
            name: "visinema-api",
            script: "index.js",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production",
                DB_HOST: process.env.DB_HOST,
                DB_USER: process.env.DB_USER,
                DB_PASS: process.env.DB_PASS,
                DB_NAME: process.env.DB_NAME,
            }
        }
    ]
};
