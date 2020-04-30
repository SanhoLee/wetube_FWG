import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const checkScomment = document.getElementById("jsCommentNumberIdx");

const updateCommentText = updatedNumber => {
  if (parseInt(updatedNumber, 10) === 1) {
    checkScomment.innerHTML = '<span id="jsCommentNumber">1</span> comment';
  } else {
    checkScomment.innerHTML = `<span id="jsCommentNumber">${updatedNumber}</span> comments`;
  }
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
  // commentNumber.innerHTML의 type이 String이기 때문에 int 형태로 파싱해줌.
  updateCommentText(commentNumber.innerHTML);
};

const addDeleteBtn = () => {
  const span = document.createElement("span");
  const div = document.createElement("div");
  div.classList.add("jsDeleteComment", "i", "fas", "fa-backspace");
  span.appendChild(div);
  return span;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  const secondSpan = addDeleteBtn();

  li.appendChild(secondSpan);
  commentList.prepend(li);
  // 이렇게만 두면, session refresh했을 때, 최근에 작성한 comment가 가장 밑으로 가게 된다.
  // 그래서, videodetail에서 video.comment.reverse() 메소드를 사용해서 개선, array의 메소드 reverse()를 사용해서 뒤에서부터 loop element를 뿌려주도록 함.

  // increasing number for real-time
  increaseNumber();
};

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
  if (reponse.status === 200) {
    // axios로 부분적인 status만 가지고 와서, 아래 함수를 실행시킴, 전체적인 페이지의 리소소를 다시 불러들이진 않음.
    addComment(comment);
  }
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
