const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post");

router.get('/', (req, res) => {
	res.send("전체게시글이 곧 만들어 집니다");
});

//전체 게시글 목록
router.get("/posts", async (req, res) => {
	const posts = await Posts.find()
	const postsIds = posts.map((post) => post.postsId);
    const postss = await Posts.find({ postsId: postsIds });
	res.json({
		posts: posts.map((post) => ({
			posts: postss.find((Post) => Post.postsId === post.postsId ),
		})),
	});
  });

//게시글 상세 페이지
router.get("/posts/:postsId", (req, res) => {
	const { postsId } = req.params;
    const posts = Posts.find()
	const [detail] = posts.filter((posts) => posts.postsId === Number(postsId));
	res.json({ "상세 페이지":detail });
});

//게시글 작성 API
router.post("/posts", async (req, res) => {
    const { postsId, name, day} = req.body;
    
    const posts = await Posts.find({ postsId });
  if (posts.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

    const createdPosts = await Posts.create({ postsId, name, day });

  res.json({ posts: createdPosts });
});

//장바구니 개수 수정 API
// router.put("/posts/:postsId", async (req, res) => {
// 	const { postsId } = req.params;
// 	const { quantity } = req.body;
  
// 	const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
// 	if (existsCarts.length) {
// 	  await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
// 	} 
// 	return res.status(400).json({ success: false, errorMessage: "수량이 0개 이하는 불가능" });
// 	res.json({ success: true });
// })  

//게시글 삭제 API
router.delete("/posts/:postsId", async (req, res) => {
	const { postsId } = req.params;
  
	const existsPosts = await Posts.find({ postsId });
	if (existsPosts.length > 0) {
	  await Posts.deleteOne({ postsId });
	}
  
	res.json({ result: "success" });
});

module.exports = router;