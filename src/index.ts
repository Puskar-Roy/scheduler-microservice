import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config/config";
import CheckError from "./utils/checkError";
import { corsOptions, limiter } from "./utils/utils";
import errorHandler from "./middleware/errorMiddleware";
import connectDB from "./database/connectDb";
import teacherRoutes from "./routes/teacherRoutes";
import studentRoutes from "./routes/studentRoutes";
import roomRoutes from "./routes/roomRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
dotenv.config();

export const app: Application = express();
const port = process.env.PORT || 8000;

app.use(config.DEV_ENV === "PROD" ? cors(corsOptions) : cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(errorHandler);
connectDB();

app.get("/", (req: Request, res: Response) => {
  const server = config.DEV_ENV === "PROD" ? "Production" : "Dev";
  res.status(200).json({
    Success: true,
    Status: "200",
    Environment: server,
    Message: "Server is Running!",
  });
});

app.use("/api/teachers", teacherRoutes);
app.use("/api/student-groups", studentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/schedules", scheduleRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});
