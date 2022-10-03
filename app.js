const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require("./routes/posts"); //미들웨어 사용
const commentsRouter = require("./routes/comments"); //미들웨어 사용
const connect = require("./schemas");
connect();

app.get('/', (req, res) => {
    res.send('Welcome to my blog');
});

app.use(express.json());

app.use("/api", [postsRouter, commentsRouter]); //미들웨어 사용

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });