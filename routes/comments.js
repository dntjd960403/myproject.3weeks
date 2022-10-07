const express = require('express');
const router = express.Router();
const Comments = require("../schemas/comments");

//댓글 작성 API
router.post("/:postId", async (req, res) => {
    const { postId } = req.params
    const { name, content, password} = req.body;

    if( content !== "") {
    const createdComment = await Comments.create({ name, content, password, postId });
    res.json({ message: "댓글을 생성하였습니다.", data: createdComment});
    } else {
        res.status(400).json({ message: "댓글을 입력해 주세요"})
    }
});

//댓글 목록 API
router.get("/:postId", async (req, res) => {
    const { postId } = req.params

	const comments = await Comments.find({ postId: postId }).sort({_id:-1})
	const comment = comments.map((val)=>{
        return {commentId: val._id, user: val.name, content: val.content, createdAt: val.day}
    })
	res.json({data: comment});
  });

  // 댓글 수정 API
router.put("/:commentId", async (req, res) => {
	const { commentId } = req.params;
	const { password, content } = req.body;

	const existsComments = await Comments.find({ _id: commentId }); // _id가 postsId인 애를 가져와라
    if (existsComments[0].password === password) {
        if( content !== "") {
            await Comments.updateOne({ _id: commentId }, { $set: { content } });
            return res.json ({ message: "댓글을 수정하였습니다."})
        } else {
            return res.status(400).json({ message: "댓글을 입력해 주세요"})
        }
    }
    else return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
}) 

//댓글 삭제 API
router.delete("/:commentId", async (req, res) => {
	const { commentId } = req.params;
	const { password } = req.body;
  
	const existsComments = await Comments.find({ _id: commentId });
    if (existsComments[0].password === password) {
        await Comments.deleteOne({ _id : commentId });
    } else return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
    
    return res.json({ message: "댓글을 삭제하였습니다." });   
});

module.exports = router;