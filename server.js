const express = require("express");
var expressStaticGzip = require("express-static-gzip");
const path = require("path");
const fs = require("fs");
const seo = require("./seo"); // note here
const app = new express();
app.use("/static", expressStaticGzip(path.join(__dirname, "build/static")));
// app.use("/static", express.static(path.join(__dirname, "build/static")));
app.use(require('prerender-node').set('prerenderToken', 'BFUnC9UaaRegVaIhwV2o'));
app.get("*", (req, res) => {

    console.log(""+path+" hahahahah "+__dirname)

    let pathname = req.pathname || req.originalUrl;
    // console.log(pathname+"11111")

    if(pathname == "/sitemap.xml") {
        // console.log(pathname+"222222")
        return res.sendFile(path.join(__dirname, "build", "sitemap.xml"));
    }
    // let page = seo.find((item) => pathname.includes(item.SLUG));
    //
    // if (page) {
    //     let html = fs.readFileSync(path.join(__dirname, "build", "index.html"));
    //     let htmlWithSeo = html
    //         .toString()
    //         .replace("__SEO_TITLE__", page.TITLE_META_TAG)
    //         .replace("__SEO_DESCRIPTION__", page.DESCRIPTION_META_TAG);
    //     return res.send(htmlWithSeo);
    // }
    return res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(5000, () => {
    console.log("listened on 5000");
});

// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const app = new express();
// app.use("/static", express.static(
//     path.join(__dirname, "build/static")
// ));
// app.get("*", (req, res) => {
//     return res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// app.listen(3000, () => {
//     console.log("listened on 3000");
// });