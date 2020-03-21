import passport from "passport";
import User from "./models/User";

// strategy는 how to login 의 개념이며, 여기서 username, password로 인증하게 설정,default방식, 이게 passport-local 방식임.
// 이외에도 passport-facebook, passport-github등 몇개든 사용할 수 있음.
passport.use(User.createStrategy());

// https://github.com/saintedlama/passport-local-mongoose 사용자 정보를 쿠키에 전송, 찾아오기를 serialization, deserialization으로 수행됨
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
