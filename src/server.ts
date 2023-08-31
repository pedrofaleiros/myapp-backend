import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { router } from "./routes";
import cors from 'cors';

// const PORT = 3333;
const PORT = process.argv[process.argv.length - 1] || 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		return res.status(400).json({ error: err.message });
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error'
	});
});

app.listen(PORT, () => {
	console.log("Servidor Online na porta", PORT);
});