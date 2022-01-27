import express, { request, response } from "express";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Home");
});

app.get("/api/todos", async (req, res) => {
	const data = await readFile("./database/database.json", "utf8");
	const json = JSON.parse(data);
	console.log(data);

	res.json(json.todos);
});
const DATABASE_URI = "./database/database.json";

app.post("/api/todos", async (req, res) => {
	console.log(req.body);
	const data = await readFile("./database/database.json", "utf8");
	const json = JSON.parse(data);

	const todo = {
		...req.body,
		id: uuid(),
	};
	json.todos.push(todo);
	await writeFile(DATABASE_URI, JSON.stringify(json));
	res.status(201);
	res.json(todo);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
