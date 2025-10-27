if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL environment variable");
}

const config = {
    schema: "./src/lib/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};

export default config;