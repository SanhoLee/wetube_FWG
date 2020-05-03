// mongod로 잘 설치됐는지 확인
// mongo 를 치면, mongo로 접속. exit 으로 나가기.
// javascript - mongodb(database)랑 연결 해주기 위해서, mongoose(mongoosejs, npm install mongoose로 설치)가 필요함. mongodb는 c++로 만들어졌다고함.

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// dotenv는 내가 공개하고싶지 않은정보를 위해 이용한다.
// 아래의 URL 부분의 몽고 db주소를 숨겼음.
// mongoose.connect(
//   "mongodb://localhost:27017/we-tube"
//   {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// dotenv.config() 해놓은 후, .env파일을 만들어 원하는 변수를 저장해놓는다. 반드시 gitignore파일에 추가해놓을것
// process.env.var_name 으로 var_name으로 접근할 있다.
// ref from .. https://github.com/xavdid/heroku-config
mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);
// useNewUrlParser, useFindAndModify 를 위와 같게 설정하는것은 mongoose에서 이 설정을 이렇게 해야 파싱할 수 있다고함. 그냥 받아들임.

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error => console.log(`❌  Error on DB Connection:${error}`);

// db를 오픈 했는지 확인하기 위해, handleOpen, handleError 함수를 만들어서 집어넣어줌
// once 메소드를 이용해서, db를 한번만 오픈해줌.
db.once("open", handleOpen);
db.on("error", handleError);
