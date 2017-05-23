const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const indexPath = path.resolve('build/index.html');
const buildPath = path.resolve('build');

app.use(express.static(buildPath));

app.get('*', function(req, res) {
  res.sendFile(indexPath);
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
});
