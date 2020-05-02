import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

import routes from "./routes";

// s3 객체? user? 를 초기화 한다.
// aws-sdk를 사용하기 위해, 필용한 정보를 미리 입력해준다.
// aws 중에서도, S3(storage)를 사용하기 위함이기때문에, S3객체를 정의
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-1"
});

// multer는 비디오 파일을 입력받아서, 파일의 url을 반환해주는 미들웨어다.
// 아래의 경로로 비디오를 저장해준다.
// S3 storage를 사용하기 위해, dest를 쓰지않고, storage : multerS3로 설정.
const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetubefg/video"
  })
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetubefg/avatar"
  })
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

// locals를 이용해서, pug로 정의한 템플릿에 변수로 할당할 수 있게 설정함.
// res.locals.(variable name) 요렇게 각각 템플릿에서 local하게 사용할 수 있는 변수를 지정해줌.
// routes를 변수로 설정해줌으로써, pug파일에서도 routes를 사용할 수 있다.
// express document, res.locals 에 설명되어있다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
