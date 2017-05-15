
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');

app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/api/whoami', (req, res) => {
  const ipaddress =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({ ipaddress, language, software });
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port '.concat(listener.address().port));
});
