import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const reponse = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  //   data:{comment} 는 comment:comment 란 뜻인데, 앞쪽 comment는,
  // videoController의 postAddComment에서 req.body.comment 의 comment를 참조해서 가져온다.
  // 즉, req.body.comment = comment(here, the comment we texted on) 와 같게 된다.
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
