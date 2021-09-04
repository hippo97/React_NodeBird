const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.end('Hello node'); // 마지막에만 쓰는거 두번 사용하면 안됨
});
server.listen(3065, () => {
  console.log('서버 실행 중');
});
