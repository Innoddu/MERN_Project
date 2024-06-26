import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";

const app = express();
// Morgan shows the API logs! It's really helpful for seeing what API is called
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", noteRoutes);


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found !!!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode =error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });

});


export default app;