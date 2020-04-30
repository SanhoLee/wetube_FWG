import axios from "axios";

const deleteComments = document.getElementsByClassName("jsDeleteComment");
const commentNumber = document.getElementById("jsCommentNumber");
const commentList = document.getElementById("jsCommentList");

const decreseCommnetNum = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
  // commentNumber.innerHTML의 type이 String이기 때문에 int 형태로 파싱해줌.
};

const deleteComment = async commentId => {
  try {
    const commentTag = await document.getElementById(`${commentId}`);
    const li = commentTag.parentElement;
    commentList.removeChild(li);
    decreseCommnetNum();
  } catch (error) {
    console.log(error);
  }
};

const sendDeleteComment = async commentId => {
  // const videoId = window.location.href.split("/videos/")[1];
  console.log(commentId);
  const reponse = await axios({
    url: `/api/${commentId}/delete/comment`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (reponse.status === 200) {
    // axios로 부분적인 status만 가지고 와서, 아래 함수를 실행시킴, 전체적인 페이지의 리소소를 다시 불러들이진 않음.
    deleteComment(commentId);
  }
};

const handleDeleteComment = event => {
  const {
    target: { id }
  } = event;
  sendDeleteComment(id);
};

function init() {
  Array.from(deleteComments).forEach(potato => {
    potato.addEventListener("click", handleDeleteComment);
  });
}

if (deleteComments) {
  init();
}
