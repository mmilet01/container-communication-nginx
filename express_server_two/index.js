import pg from "pg";
import express from "express";
import Redis from "ioredis";

const app = express();
const port = 5000;

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

// Don't forget to close the connection when you're done

/* 
const client = createClient({
	host: "redis-srv",
	port: 6379,
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect().then(() => {
	console.log("successfully connected to redis");
});
 */
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

app.get("/api/express_server_two", (req, res) => {
	res.send("Hello Worlds!");
});

app.listen(port, () => {
	console.log(`express DB server listening at http://localhost:${port}`);
});
