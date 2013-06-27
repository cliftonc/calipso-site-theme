/**
 * Additional content section / block functions for body.
 */

var rootpath = process.cwd() + '/', path = require('path'), calipso = require(path.join(rootpath, 'lib/calipso')), Query = calipso.lib.mongoose.Query;

exports = module.exports = function (req, options, callback) {

  /**
   *  Get additional content for blocks in the template
   */
  calipso.lib.step(function getContentList() {

    // Create a query and retrieve the content, has pager support, using req.moduleParams
    // But you can override on an individual query by setting in the options (second param)
    var query;
    query = new Query();
    query.where('taxonomy', /^quickstart.*/);

    if (!options.user.isAdmin) {
      query.where('status', 'published');
    }

    options.getContentList(query, {req:req, sortBy:'published,desc', pager:false}, this.parallel());

  }, function done(err, output) {

    callback(err, { contents:output.contents, pager:output.pager });

  });

};