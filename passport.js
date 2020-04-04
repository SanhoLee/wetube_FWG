import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";

import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controllers/userController";
import routes from "./routes";

// strategy는 how to login 의 개념이며, 여기서 username, password로 인증하게 설정,default방식, 이게 passport-local 방식임.
// 이외에도 passport-facebook, passport-github등 몇개든 사용할 수 있음.
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`
    },
    facebookLoginCallback
  )
);

// https://github.com/saintedlama/passport-local-mongoose 사용자 정보를 쿠키에 전송, 찾아오기를 serialization, deserialization으로 수행됨
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
