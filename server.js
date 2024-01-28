import express from 'express';
import fs from 'fs';

const app = express();
const __dirname = "C:/Users/Håkon/Documents/Programmering/valentine";

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('valentine.html', options, (err) => {
    if (err) {console.log(err);res.end(err.message)}

  });
});
app.get('/ring-meg', (req, res) => {
  const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  res.sendFile('ring-meg.html', options, (err) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.end(err.message);
    }
  })
})

app.get('/*.*', (req, res) => {
  const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile(req.url, options, (err) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.end(err.message);
    }
  });
})

app.post('/response', (req, res) => {
  let ip = req.socket.address().address;
  let response = req.body.answer;
  fs.appendFile('./responses.txt', response + " from " + ip + '\n', (err) => {
    if (err) console.log("Could not append to responses.txt");
    console.log(response + " was added to the file!");
  });
  
  res.redirect('/ring-meg');
})

app.listen(9000, () => console.log("Server listening on port 9000"));