import multer from "multer";
import routes from "./routes";

// multer는 비디오 파일을 입력받아서, 파일의 url을 반환해주는 미들웨어다.
// 아래의 경로로 비디오를 저장해준다. destination.
// dest의 경로를 /uploads처럼 /를 앞에 붙여주면, 루트 디렉토리로 인식, 없으면 현재 프로젝트 폴더로 인식.
const multerVideo = multer({ dest: "uploads/videos/" });

// locals를 이용해서, pug로 정의한 템플릿에 변수로 할당할 수 있게 설정함.
// res.locals.(variable name) 요렇게 각각 템플릿에서 local하게 사용할 수 있는 변수를 지정해줌.
// routes를 변수로 설정해줌으로써, pug파일에서도 routes를 사용할 수 있다.
// express document, res.locals 에 설명되어있다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
// videoFile이란 이름은, pug상의 file input의 name 어트리뷰트 값을 가져온것 뿐.
// single옵션은 하나의 파일에 대해서 변환하는 것을 얘기함.
