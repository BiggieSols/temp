define(function (require) {
  var Handlebars = require('handlebars');

  Handlebars.registerHelper('staticPath', MR.staticPath);
  return MR.staticPath;
});