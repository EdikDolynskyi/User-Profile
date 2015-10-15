/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  '/newuser': {
    view: 'creating-user'
  },

  //'Get /findCv/:id' : 'CvsController.findCv',

  '/user/filter' : 'UsersController.filter',
  '/user/getByCentralId/:id' : 'UsersController.getByCentralId',
  'get /getpdp/:id': 'PdpsController.getPDP',
  'put /updatetech/:id': 'PdpsController.updateTechnologies',
  'put /updatecert/:id': 'PdpsController.updateCertifications',
  'put /updatetask/:id': 'PdpsController.updateTasks',
  'put /updatetest/:id': 'PdpsController.updateTests',
  'put /updatepos/:id': 'PdpsController.updatePosition',
  'put /updatedir/:id': 'PdpsController.updateDirection',
  'put /addtech/:id': 'PdpsController.addTechnology',
  'put /removetech/:id': 'PdpsController.removeTechnology',
  'put /addcert/:id': 'PdpsController.addCertification',
  'put /removecert/:id': 'PdpsController.removeCertification',
  'put /addtest/:id': 'PdpsController.addTest',
  'put /removetest/:id': 'PdpsController.removeTest',
  'put /addtask/:id': 'PdpsController.addTask',
  'put /removetask/:id': 'PdpsController.removeTask',
  'put /addach/:id': 'PdpsController.addAchievement',
  'put /removeach/:id': 'PdpsController.removeAchievement',
  'put /addcompcert/:id': 'PdpsController.addCompletedCertification',
  'put /removecompcert/:id': 'PdpsController.removeCompletedCertification',

  'post /downloadimg': 'FilesController.downloadFile',

  'get /cv/:cv_id/technology/:id': 'CvsController.getTechnology',
  'put /cv/:cv_id/technology/:id': 'CvsController.updateTechnology',
  'put /cv/:cv_id/technology': 'CvsController.removeTechnologyFromCV',
  'post /cv/:cv_id/technology': 'CvsController.addTechnologyToCV',
  'get /users_projects/:user_id': 'Users_projectsController.getUserProjects',
  'get /projects/:id': 'Users_projectsController.getProject',
  'post /projects': 'Users_projectsController.createProject',
  'put /users/:id/currentproject': 'UsersController.updateCurrentProject',
  'put /users_projects/:id': 'Users_projectsController.updateProject'


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
