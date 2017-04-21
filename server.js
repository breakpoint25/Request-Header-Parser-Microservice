const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const url = '/api/whoami';

app.get(url, (req, res) => {
  const ipaddress =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  const language = req.headers['accept-language'].split(',')[0]; // 'en-US'
  const software = req.headers['user-agent'].split(')')[0].split('(')[1]; // Windows NT 10.0; Win64; x64'

  res.json({ ipaddress, language, software });
});

app.listen(port, () => {
  console.log('App listening on port 3000!');
});
