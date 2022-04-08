const { default: axios } = require("axios");
require("babel-register")({
  presets: ["es2015", "react"]
}) 
const api = require('../src/Utils/api').default

const Sitemap = require("react-router-sitemap").default;
const router = require("./sitemap-routes").default;

async function generateSitemap() {
  try {
    const galleryItems = await axios.get('http://localhost:5001/gallery')
    let idMap = [];

    for(let i=0;i<galleryItems.data.length;i++){
      idMap.push({id: galleryItems.data[i]._id});
    }
    console.log(galleryItems.data)
    console.log(idMap)
    const paramsConfig = {
      '/create/:id': idMap
    }

    return (
      new Sitemap(router)
        .applyParams(paramsConfig)
        .build("https://zferg.com")
        .save("./public/sitemap.xml")
    );
  } catch(err) {
    console.log(err);
  }
}

generateSitemap();