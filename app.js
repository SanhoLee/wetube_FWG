import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import routes from "./routes";

const app = express();

app.use(helmet());
app.set("view engine", "pug")
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(localsMiddleware)


// routes.home -> '/'
app.use(routes.home, globalRouter);

// routes.users -> '/users'
app.use(routes.users, userRouter);

// routes.videos -> '/videos'
app.use(routes.videos,videoRouter);

export default app;
// all 'app' object is exported!
