/**
 * Created by Dhruvraj on 11/12/2016.
 */
var sphere_influence = require('../controllers/sphere_influence.server.controller');

module.exports = function(app) {
    app.route('/api/getSphereInfluence')
        .get(sphere_influence.getSphereInfluence);
};