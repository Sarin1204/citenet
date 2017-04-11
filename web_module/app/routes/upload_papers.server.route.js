/**
 * Created by sarin on 11/12/16.
 */

var upload_papers = require('../controllers/upload_papers.server.controller');

module.exports = function(app){

    app.route('/api/uploadPapers')
        .post(upload_papers.uploadPapers);

    app.route('/api/getProgress/:id')
        .get(upload_papers.getProgress);

    app.route('/api/uploadPhrase')
        .post(upload_papers.uploadPhrase);

    app.route('api/getPhraseProgress/:id')
        .get(upload_papers.getProgress);

};