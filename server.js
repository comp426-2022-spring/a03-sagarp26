const express = require("express")
const app = express()

const args = require("minimist")(process.argv.slice(2))
args["port"]
const port = args.port || 5000

const server = app.listen(port, () => {
  console.log("App listening on port %PORT%".replace("%PORT%", port))
})

app.use(function(req, res) {
  res.status(404).send("404 NOT FOUND")
})

app.get("/app/", (req, res) => {
  res.type("text/plain")
  res.status(200).send("200 OK")
})

app.get("/app/flip/", (req, res) => {
  const flip = coinFlip()
  res.type("text/json")
  res.status(200).json({"flip":flip})
})

app.get("/app/flips/:number", (req, res) => {
  const flips = coinFlips(req.params.number)
  const count = countFlips(flips)
  res.type("text/json")
  res.status(200).json({"raw":flips,"summary":count})
})

app.get("/app/flip/call/heads", (req, res) => {
  const result = flipACoin("heads")
  res.type("text/json")
  res.status(200).json({result})
})

app.get("/app/flip/call/tails", (req, res) => {
  const result = flipACoin("tails")
  res.type("text/json")
  res.status(200).json({result})
})

function coinFlip() {
  let x = Math.floor(Math.random() * 2);
  var result = ""
  if(x < 1) {
    result = "heads";
  }
  else {
    result = "tails";
  }
  return result;
}

function coinFlips(flips) {
  const f = [];
  for (let i = 0; i < flips; i++) {
    f[i] = coinFlip();
  }
  return f;
}

function countFlips(array) {
  var x = 0;
  var y = 0;
  for(let i = 0; i < array.length; i++) {
    if(array[i] == "heads") {
      x++;
    }
    else if(array[i] == "tails") {
      y++;
    }
  }
  const result = `{"tails":${y}, "heads":${x}}`;
  return result;
}

function flipACoin(c) {
  let f = coinFlip();
  var r = "";
  if(c == f) {
    r = "win";
  }
  else {
    r = "lose";
  }
  const message = `"call":${c}, "flip":${f}, "result":${r}`;
  return message;
}