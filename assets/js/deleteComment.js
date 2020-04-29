import axios from "axios";

const deleteComments = document.getElementsByClassName("jsDeleteComment");
const commentListDelete = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreseCommnetNum = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
  // commentNumber.innerHTML의 type이 String이기 때문에 int 형태로 파싱해줌.
};

const dComment = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  const reponse = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST"
  });
  //   data:{comment} 는 comment:comment 란 뜻인데, 앞쪽 comment는,
  // videoController의 postAddComment에서 req.body.comment 의 comment를 참조해서 가져온다.
  // 즉, req.body.comment = comment(here, the comment we texted on) 와 같게 된다.
  if (reponse.status === 200) {
    // axios로 부분적인 status만 가지고 와서, 아래 함수를 실행시킴, 전체적인 페이지의 리소소를 다시 불러들이진 않음.
    // addComment(comment);
  }
};

const handleDeleteComment = event => {
  const {
    target: { parentElement: span_tag }
  } = event;
  try {
    const li = span_tag.parentElement;
    commentListDelete.removeChild(li);
    decreseCommnetNum();
    // 전체 리스트 ul태그에서, 지정한 li태그를 삭제해줌, 여기까지는 front-end만 된거.
    dComment();
  } catch (error) {
    console.log(error);
  }
};

function init() {
  Array.from(deleteComments).forEach(potato => {
    potato.addEventListener("click", handleDeleteComment);
  });
}

if (deleteComments) {
  init();
}
