import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(7777, () => console.log(`Server started on port 7777`));
