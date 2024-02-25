import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import csvtojson from "csvtojson";
import { config } from "dotenv";
config();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
	})
);

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
	try {
		const csvFilePath = "data.csv";

		const jsonArray = await csvtojson().fromFile(csvFilePath);

		res.status(200).json({
			error: false,
			data: jsonArray,
		});
	} catch (error) {
		res.status(500).json({
			error: true,
			message: "Internal Server Error"
		});
	}
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
