/**
 * Created by sarin on 4/8/17.
 */


var upload_keywords = require('../controllers/upload_keywords.server.controller');

module.exports = function(app){

    app.route('/api/uploadKeywords')
        .post(upload_keywords.uploadKeywords);

    app.route('/api/getKeywordProgress/:id')
        .get(upload_keywords.getKeywordProgress);

};