import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Comments'
    }
  ]
});
// comment의 경우, Comment에 정의해준 모델을 참조모델로해서, 하나의 비디오에 달리는 Comment 객체 id를 어래이 형태로 가지게 되고, 코멘트 아이디만 다 가져와서 관리하게 된다.
// 반대로 적용도 가능하다. 즉, 한 코멘트에 대해서, 참조하게 될 비디오 아이디를 불러와서 연결 지을수도 있다.
// 전자가 관리하기도 수월하고, 이해도 부분에서도 용이하게 때문에 비디오 모델에 코멘트 아이디를 가져와서 관리 하는게 좋은 것 같다.


const model = mongoose.model("Video", VideoSchema);
export default model;
// 작성한 스키마 형태를 모델 객체로 만들어주고, export해줌.
// init.js에서 model을 import해주면 만들어준 비디오 모델을 인식하게 됨.