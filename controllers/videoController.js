import routes from "../routes";
import Video from "../models/Video";

// await 함수는 실행되는 대상이 끝날때까지 기다려 준다. 단. async함수 내에서 실행되어야 한다.
// Javascript는 기본적으로 하나의 명령어가 끝날때까지 기다려주지 않기 때문에 await로 비디오를 찾을 때까지 실행시킴.
// await Video.find({}); 는 Video에 있는 모든 비디오를 가져오게 된다.
// home 으로 가면, 오래된 비디오가 가장 위로 오는 현상이 있어서, sort -1로 최근 올린 영상이 위로 오게 했다.
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
// error가 발생하면, videos는 데이터가 없기 때문에 빈 어레이 []로 처리해줌.

export const search = async (req, res) => {
  // #1 new Way - We use this way on this code!
  // const {
  //   query: { term }
  // } = req;

  // #2 Old Way
  // const searchingBy = req.query.term;
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    // 위에 있는 path를 가지고 와서 아래 path에 할당해줌
    fileUrl: path,
    title,
    description
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
  // 비디오 아이디에 존재하지 않는 정보가 들어오면 홈으로 리다이렉팅
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    // id로 먼저 편집 할 비디오를 찾고,
    const video = await Video.findById(id);
    // 편집 비디오 페이지 렌더링!
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    // title:title, description:description 의 표현이 아래와 같이 되었음.
    // id로 비디오를 찾은 다음, 업데이트 한다.
    // mongoose에서 파일을 id로 찾으려면, key ==> _id 이므로, 이부분은 주의할것. 여기서는 id가 condition이 되서 query 해준다.
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    console.log(id);
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
