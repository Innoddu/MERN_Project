import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import morgan from "morgan";

const app = express();
// Morgan shows the API logs! It's really helpful for seeing what API is called
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", noteRoutes);


app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage })

});


export default app;