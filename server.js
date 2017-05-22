const express = require('express');
const app = express();
const PORT = 3000;
const indexPath = __dirname + '/build/index.html';
const buildPath = __dirname + '/build';

app.use(express.static(buildPath));

app.get('*', function(req, res) {
  res.sendFile(indexPath);
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
});
