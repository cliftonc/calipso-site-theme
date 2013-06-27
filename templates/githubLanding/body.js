/**
 * Additional content section / block functions for body.
 */

var rootpath = process.cwd() + '/', path = require('path'), calipso = require(path.join(rootpath, 'lib/calipso')), Query = calipso.lib.mongoose.Query;

exports = module.exports = function (req, options, callback) {

  /**
   *  Get additional content for blocks in the template
   */
  calipso.lib.step(

    function getContentList() {

      options.getContent(req, 'github-header-text', this.parallel());

      // Create a query and retrieve the content, has pager support, using req.moduleParams
      // But you can override on an individual query by setting in the options (second param)
      var query = new Query({
        'contentType':'Github Feed'
      });

      options.getContentList({contentType:'Github Feed'}, {
        req:req,
        sortBy:'published,desc',
        limit:30
      }, this.parallel());

    }, function done(err, header, output) {

      console.dir(output);

      callback(err, {
        header:header,
        contents:output.contents,
        pager:output.pager
      });

    });

};