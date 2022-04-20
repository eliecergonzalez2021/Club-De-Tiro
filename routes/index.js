exports.load = (app) => {
    // front
    app.use("/", require("./front.route"));

    // back
    app.use("/api/v1", require("./api.route"));
    // redirect home o inicio
   /*  app.use('*',(_, res) => res.redirect('/')) */
};