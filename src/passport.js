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

// localtunnel이 막혀서, ngrok으로 대응 ->> 일단 기존 localhost 서버를 실행시키고, 다른 터미널에서 다시 ngrok을 실행시키면, https url이 임시로 생성됨. 그걸 이용해서 Facebook에 삽입
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://84cf72ac.ngrok.io${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

// https://github.com/saintedlama/passport-local-mongoose 사용자 정보를 쿠키에 전송, 찾아오기를 serialization, deserialization으로 수행됨
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
