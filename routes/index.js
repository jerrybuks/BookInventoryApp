const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes")

module.exports = function (router, app) {
    //call up you route categories here
    router.use("/user", userRoutes());
    router.use("/books", bookRoutes())
    return router;
}