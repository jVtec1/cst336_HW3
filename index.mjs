import express from 'express';
import fetch from 'node-fetch';
//needed to use node with vercel
import path from "path";
import { domainToASCII, fileURLToPath } from "url";

//needed to use node with vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
//needed to use node with vercel
app.set("views", path.join(__dirname, "views")); // Ensure this points to the correct directory
app.use(express.static("public"));

let cUrl = "https://rickandmortyapi.com/api/character";
let cResponse = await fetch(cUrl);
let cData = await cResponse.json();

let lUrl = "https://rickandmortyapi.com/api/location";
let lResponse = await fetch(lUrl);
let lData = await lResponse.json();

let eUrl = "https://rickandmortyapi.com/api/episode";
let eResponse = await fetch(eUrl);
let eData = await eResponse.json();

app.get('/', async(req, res) => {  
    let rand = Math.floor(Math.random() * cData.info.count);
    let url2 = "https://rickandmortyapi.com/api/character/" + rand;
    let response2 = await fetch(url2);
    let data2 = await response2.json();
    res.render('home', 
      {
      chars:data2
    });
});

app.get('/characters', async(req, res) => {  
  let rand = Math.floor(Math.random() * cData.info.count);
  let url2 = "https://rickandmortyapi.com/api/character/" + rand;
  let response2 = await fetch(url2);
  let data2 = await response2.json();

  // console.log(data2);
  res.render('characters',
    {
      chars:data2
    });
});

app.get('/customChar', async(req, res) => {  
  let idSelect = req.query.id;
  let url2 = "https://rickandmortyapi.com/api/character/" + idSelect;
  let response2 = await fetch(url2);
  let data2 = await response2.json();

  // console.log(data2);
  res.render('characters',
    {
      chars:data2
    });
});

app.get('/locations', async(req, res) => {  
  let rand = Math.floor(Math.random() * lData.info.count);
  let url2 = "https://rickandmortyapi.com/api/location/" + rand;
  let response2 = await fetch(url2);
  let data2 = await response2.json();

  // console.log(data2);
  res.render('locations',
    {
      locs:data2
    });
});

app.get('/episodes', async(req, res) => {  
  let rand = Math.floor(Math.random() * eData.info.count);
  let url2 = "https://rickandmortyapi.com/api/episode/" + rand;
  let response2 = await fetch(url2);
  let data2 = await response2.json();

  // console.log(data2);
  res.render('episodes',
      {
        eps:data2
      });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

//needed to use node with vercel
export default app;