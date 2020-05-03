import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");

// 아래 views의 디렉토리 설정방법은 express js의 view engine document에 설명되어있음.
// path.join(arg1,arg2,...)  -> arg들의 패스를 이어서 붙여준다.
app.set("views", path.join(__dirname, "views"));

// express.static() 디렉토리에 파일을 보내주는 미들웨어임.
// 컨트롤러나, 어떤 view로 렌더링 작업도 하지않고, file만 찾으러 갈거임.
// static(directory name)이므로, 여기서는 src/static(절대경로) 라는 디렉토리의 파일을 찾으러 감.
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
// routes, user라는 변수를 사용할 수 있는 이유는 위에서 localsMiddleware를 사용한다고 정의해주었기 때문,
// 여기 정의 되어 있는 변수를 아래에서 국부적으로 모두 사용할 수 있게 됨.

// routes.home -> '/'
app.use(routes.home, globalRouter);

// routes.users -> '/users'
app.use(routes.users, userRouter);

// routes.videos -> '/videos'
app.use(routes.videos, videoRouter);

// API Router
app.use(routes.api, apiRouter);

export default app;
// all 'app' object is exported!
