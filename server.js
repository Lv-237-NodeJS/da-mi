const express = require('express');
const app = express();
const PORT = 3000;
const INDEX_PATH = __dirname + '/build/index.html';
const BUILD_PATH = __dirname + '/build';

app.use(express.static(BUILD_PATH));

app.get('*', function(req, res) {
  res.sendFile(INDEX_PATH);
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
});
