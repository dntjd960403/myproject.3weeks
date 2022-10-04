const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post");

// 게시글 목록
router.get("/", async (req, res) => {
	const posts = await Posts.find().sort({_id:-1})
	const post = posts.map((val)=>{
        return {postId:val._id, title: val.title,  user: val.name, createdAt:val.day}
    })
	res.json({data: post});
  });

// //게시글 상세 페이지
router.get("/:postsId", async (req, res) => {
	const { postsId } = req.params;
    
    const posts = await Posts.find({ _id: postsId })
    const post = posts.map((val) => {
        return {postId:val._id, user: val.name, title: val.title, content: val.contents, createdAt: val.day}
    })
        res.json({ data : post });
    });
    
//게시글 작성 API
router.post("/", async (req, res) => {
    const { title, name, contents, password} = req.body;
    const createdPosts = await Posts.create({ title, name, contents, password });
  res.json({ message: "게시글을 생성하였습니다.", data: createdPosts});
});

// 게시글 수정 API
router.put("/:postsId", async (req, res) => {
	const { postsId } = req.params;
	const { password, title, contents } = req.body;
	
	const existsPosts = await Posts.find({ _id: postsId }); // _id가 postsId인 애를 가져와라
	if (existsPosts.length) {
        if (existsPosts[0].password === password) {
            await Posts.updateOne({ _id: postsId },
            { $set: { title, contents } });
            return res.json ({ message: "게시글을 수정하였습니다."})
        }
        else return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
	} 
	return res.status(400).json({ success: false, errorMessage: "존재하지 않는 게시물" });
})  

//게시글 삭제 API
router.delete("/:postsId", async (req, res) => {
	const { postsId } = req.params;
	const { password } = req.body;
  
	const existsPosts = await Posts.find({ _id: postsId });
	if (existsPosts.length > 0) {
        if (existsPosts[0].password === password) {
            await Posts.deleteOne({ _id: postsId });
        } else return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
        return res.json({ message: "게시글을 삭제하였습니다." });
	} 
	return res.json({ message: "존재하지 않는 게시물" });
});

module.exports = router;