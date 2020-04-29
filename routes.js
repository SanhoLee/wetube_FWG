// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// User
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const USER_DETAIL = "/:id";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

// API

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/comment/delete";

// Making Object!
// userDetail, videoDetail, editVideo, deleteVideo의 경우 :id 로 그냥 설정할 경우, 익스프레스는 코드를 이해하지만 html은 코드를 이해하지 못하기 때문에, 함수 형태로 변환해줌!
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  me: ME,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: id => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT
};

export default routes;
