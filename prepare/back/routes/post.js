const express = require('express'); //import

const router = express.Router();

router.post('/', (req, res) => {
  //보기에는 저렇지만 POST /post
  res.json({ id: 1, content: 'hello' });
});

router.delete('/', (req, res) => {
  //보기에는 저렇지만 DELETE /post
  res.json({ id: 1 });
});

module.exports = router; // export
