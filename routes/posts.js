const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post");

// 게시글 목록
router.get("/posts", async (req, res) => {
	const posts = await Posts.find().sort({_id:-1})
    console.log(posts)
	const post = posts.map((val)=>{
        postId = val._id,
        title = val.title,
        name = val.name,
        day = val.day

        return {postId:postId, title: title,  user: name, createdAt:day}
    })
	res.json({data: post});
  });

// //게시글 상세 페이지
router.get("/posts/:postsId", async (req, res) => {
	const { postsId } = req.params;
    
    const posts = await Posts.find({ _id: postsId })
    console.log(posts)
    const post = posts.map((val) => {
        postId=val._id,
        title=val.title,
        content=val.contents,
        name=val.name,
        day=val.day
        
        return {postId:postId, user: name, title: title, content: content, createdAt: day}
    })
        res.json({ data : post });
    });
    
//게시글 작성 API
router.post("/posts", async (req, res) => {
    const { title, name, contents, password} = req.body;
    const createdPosts = await Posts.create({ title, name, contents, password });

  res.json({ message: "게시글을 생성하였습니다.", data: createdPosts});
});

// 게시글 수정 API
router.put("/posts/:postsId", async (req, res) => {
	const { postsId } = req.params;
	const { password } = req.body;
	const { title } = req.body;
	const { contents } = req.body;

	const existsPosts = await Posts.find({ _id: postsId }); // _id가 postsId인 애를 가져와라
    console.log(existsPosts[0].password)
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
router.delete("/posts/:postsId", async (req, res) => {
	const { postsId } = req.params;
	const { password } = req.body;
  
	const existsPosts = await Posts.find({ _id: postsId });
	if (existsPosts.length > 0) {
        if (existsPosts[0].password === password) {
            await Posts.deleteOne({ _id: postsId }); //이미 가져온 DB가 한 개라서 postsId만 적어도 됨
        } else return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸슈" });
        return res.json({ message: "게시글을 삭제하였습니다." });
	}
    
	return res.json({ message: "존재하지 않는 게시물" });
});

module.exports = router;