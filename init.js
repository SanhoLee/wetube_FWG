import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();
// .env파일에 변수들 저장되있음. 보안관련 변수들을 여기다 저장해놓고, 댕겨와서 사용.

import "./models/Video";
import "./models/Comment";
import "./models/User";

// importing app object from app.js file

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅  We Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// Listening app object something url change etc..
