import routes from "../routes"


// 첫번째 argument는 pug파일, 두번째는 로컬변수값을 설정해서 할당할 수 있다. 아래에서는 pageTitle : "Join" 
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    //status Code Definition(http page) / 400 : Bad Request
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To do : Register User
    // To do : Log user In
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = (req, res) => {
  res.redirect(routes.home)
};


export const logout = (req, res) => {
  // To do : Process Log Out
  // To do : Logout시 user.isAuthenticated=false 정의 필요할듯
  res.redirect(routes.home);
}
  ;
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });