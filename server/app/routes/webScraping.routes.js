const webscrape = require("../controllers/externalSystems/webScraping.controller");
const  auth  = require("../middleware");
const webScrapeRouter = require("express").Router();
webScrapeRouter.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

webScrapeRouter.get("/rateComparison",[auth.authJwt.verifyToken], webscrape.compareRates);

module.exports = webScrapeRouter;
