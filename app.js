const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require("./routes/posts"); //미들웨어 사용
const connect = require("./schemas");
connect();

app.get('/', (req, res) => {
    res.send('Welcome to my blog');
});

app.post("/", (req,res) => {
    console.log(req.body)
  
    res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.");
})


app.use(express.json());

app.use("/api", [postsRouter]); //미들웨어 사용

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });