// User Object 생성!
import mongoose from "mongoose";
// import passport local mongoose -> id, pw등 관리해주는 플러그인.
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

// 플러그인 적용! email을 필드로 사용한다.
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
export default model;
