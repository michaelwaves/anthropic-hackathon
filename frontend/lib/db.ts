import pg from "pg-promise";

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error("Must set env variable DATABASE_URL to postgres connection string")

const globalDb = global as typeof global & { db: pg.IDatabase<object>, helpers: pg.IHelpers }

if (!globalDb.db) {
    const client = pg()
    globalDb.db = client(DATABASE_URL)
    globalDb.helpers = client.helpers
}

export const db = globalDb.db
export const helpers = globalDb.helpers