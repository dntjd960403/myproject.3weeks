const express = require('express');
const { title } = require('process');
const router = express.Router();
const Posts = require("../schemas/post");

// 게시글 목록
router.get("/posts", async (req, res) => {
	const posts = await Posts.find()
    console.log(posts)
	const post = posts.map((val)=>{
        postId = val._id,
        titles = val.title,
        name = val.name,
        day = val.day

        return {postId:postId, title: titles,  user: name, createdAt:day}
    })
	res.json({data: post});
  });

// //게시글 상세 페이지
router.get("/posts/:postsId", async (req, res) => {
	const { postsId } = req.params;
    
    const posts = await Posts.find({ _id : postsId})

    const post = posts.map((val) => {
        postId=val._id,
        titles=val.title,
        content=val.contents,
        name=val.name,
        day=val.day
        
        return {postId:postId, user: name, title: titles, content: content, createdAt: day}
    })
        res.json({ data : post });
    });
    
//게시글 작성 API
router.post("/posts", async (req, res) => {
    const { title, name, contents, password} = req.body;
    const createdPosts = await Posts.create({ title, name, contents, password });

  res.json({ data: createdPosts });
});

// 게시글 수정 API
// router.put("/posts/:postsId", async (req, res) => {
// 	const { postsId } = req.params;
// 	const { contents } = req.body;
    
// 	const existsPosts = await Posts.find({ postsId: Number(postsId) });
	
// 	if (existsPosts.length) {
//         // if(passcheck===existsPosts.password) {
//             await Posts.updateOne({ postsId: Number(postsId) }, { $set: { contents } });
//         // } else {
//         //     return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
//         // }
// 	} 
// 	return res.status(400).json({ success: false, errorMessage: "수량이 0개 이하는 불가능" });
// 	res.json({ success: true });
// })  

// //게시글 삭제 API
// router.delete("/posts/:postsId", async (req, res) => {
// 	const { postsId } = req.params;
// 	const { password } = req.body;
  
// 	const existsPosts = await Posts.find({ postsId });
// 	if (existsPosts.length > 0) {
// 	  await Posts.deleteOne({ postsId });
// 	}
  
// 	res.json({ result: "success" });
// });

module.exports = router;