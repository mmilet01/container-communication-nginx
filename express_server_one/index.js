import pg from "pg";
import express from "express";
import Redis from "ioredis";

const app = express();
const port = 5001;

const { Pool } = pg;

const redis = new Redis({
	host: "redis-srv", // Redis host
	port: 6379, // Redis port
});

// Now you can use the redis instance to run Redis commands.
redis.set("foo", "bar");
redis.get("foo", function (err, result) {
	console.log("REIDS RESULT, SUCCESSFULLY CONNECTED", result);
});

const pool = new Pool({
	user: "postgres",
	host: "postgres",
	database: "postgres",
	password: "postgres",
	port: 5432,
});

// Connect to PostgreSQL
pool.connect((err, client, release) => {
	if (err) {
		return console.error("Error acquiring client", err.stack);
	}
	client.query("SELECT NOW()", (err, result) => {
		release();
		if (err) {
			return console.error("Error executing query", err.stack);
		}
		console.log(result.rows);
	});
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
