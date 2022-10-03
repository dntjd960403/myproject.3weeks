const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post");
const Comments = require("../schemas/comments");

//댓글 작성 API
router.post("/comments/:postId", async (req, res) => {
    const { postId } = req.params
    const { name, content, password} = req.body;

    const createdComment = await Comments.create({ name, content, password, postId });

  res.json({ message: "댓글을 생성하였습니다.", data: createdComment});
});

//댓글 목록 API
router.get("/comments/:postId", async (req, res) => {
    const { postId } = req.params

	const comments = await Comments.find({ postId: postId }).sort({_id:-1})
	const comment = comments.map((val)=>{
        commentId = val._id,
        content = val.content,
        name = val.name,
        day = val.day

        return {commentId: commentId, user: name, content: content, createdAt: day}
    })
	res.json({data: comment});
  });

  // 댓글 수정 API
router.put("/comments/:postId", async (req, res) => {
	const { postId } = req.params;
	const { password, content, num } = req.body;

	const existsComments = await Comments.find({ postId: postId }); // _id가 postsId인 애를 가져와라
    console.log(existsComments[num].password)
    if (existsComments[num].password === password) {
        await Comments.updateOne({ _id: existsComments[num]._id },
        { $set: { content } });
        return res.json ({ message: "댓글을 수정하였습니다."})
    }
    else return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
}) 

//게시글 삭제 API
router.delete("/comments/:postId", async (req, res) => {
	const { postId } = req.params;
	const { password, num } = req.body;
  
	const existsComments = await Comments.find({ postId: postId });
    if (existsComments[num].password === password) {
        await Posts.deleteOne({ _id: existsComments[num]._id }); //이미 가져온 DB가 한 개라서 _id만 적어도 됨
    } else return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
    
    return res.json({ message: "댓글을 삭제하였습니다." });   
});

module.exports = router;