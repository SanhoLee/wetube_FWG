import routes from "../routes";
import Video from "../models/Video";

// await 함수는 실행되는 대상이 끝날때까지 기다려 준다. 단. async함수 내에서 실행되어야 한다.
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  // #1 new Way - We use this way on this code!
  // const {
  //   query: { term }
  // } = req;

  // #2 Old Way
  // const searchingBy = req.query.term;
  const {
    query: { term: searchingBy }
  } = req;
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
    res.render("videoDetail", { pageTitle: "Video Detail", video });
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
    // id는 그대로 이고, title, description을 수정하면 다시 redirect 되는 구조?
    // findOneAndUpdate를 쓰면 변경하고자 하는 내용을? 먼저 저장을 해야된다고 함.
    await Video.findOneAndUpdate({ id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
