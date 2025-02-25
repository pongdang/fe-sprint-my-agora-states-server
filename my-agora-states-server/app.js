const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// TODO: cors를 적용합니다.
app.use(cors());

// TODO: Express 내장 미들웨어인 express.json()을 적용합니다.
// OPTIONAL: HTTP 요청 logger인 morgan을 적용합니다.
app.use(express.json());

// @see: https://seohyun0120.tistory.com/entry/Log-morgan으로-http-request-로그를-남겨보자
// morgan은 포맷과 객체를 인자로 받는 함수
// stream은 객체
// write는 log 함수의 키
app.use(
  morgan("dev", {
    stream: {
      write: (message) => process.stdout.write(message),
    },
  })
);

// ! 다른 포트 번호로 서버 켜기
// ! PORT=3002 nodemon my-agora-states-server/app.js
// ! PORT=3002 npm start
// port 환경 변수 설정 @see: https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js
const port = process.env.PORT || 3001;

const discussionsRouter = require("./router/discussions");

// TODO: /discussions 경로로 라우팅합니다.
app.use("/discussions", discussionsRouter);

app.get("/", (req, res) => {
  // TODO: 서버 상태 확인을 위해 상태 코드 200으로 응답합니다.
  // throw "";
  return res.status(200).send("hello My Agora States Server");
});

const server = app.listen(port, () => {
  console.log(`[RUN] My Agora States Server... | http://localhost:${port}`);
});

module.exports.app = app;
module.exports.server = server;
