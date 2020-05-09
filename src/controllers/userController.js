import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// 첫번째 argument는 pug파일, 두번째는 로컬변수값을 설정해서 할당할 수 있다. 아래에서는 pageTitle : "Join"
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    // flash message print,
    // req.flash(<ref_string>, <message_string>), <ref_string> is used on templete page(pug file)
    req.flash("error", "Password Don't match! ");
    // status Code Definition(http page) / 400 : Bad Request
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl:
          "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
      });
      await User.register(user, password);
      console.log("✅  User registered :", user.name);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To do : Log user In
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome!",
  failureFlash: "Can't Log In. Check email and/or Password"
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // user.githubId정의는 User.js에서 User의 데이터 schema안에 githubId라는 변수를 미리 만들어서 나서 지정가능함.
      // facebookId도 같은 의미로, email로 User를 검색해서 각각 Id를 할당해 정의할 수 있음.
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome!",
  failureFlash: "Can't Log In. Check email and/or Password"
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged Out, See U Later");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not Found");
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl
    });
    req.user.save();
    req.flash("success", "Profile Updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't Update Profile");
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Password Don't match! ");
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    // changePassword는 여기서 passport local mongoose의 라이브러리를 사용한 거임.
    await req.user.changePassword(oldPassword, newPassword1);
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't Change Password");
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
