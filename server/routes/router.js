
const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method get 
 */

route.get('/',services.homeRoutes);

/**
 *  @description Add User
 *  @method get 
 */

route.get('/add-user',services.add_user);

/**
 *  @description Update User
 *  @method get 
 */

route.get('/update-user',services.update_user);

//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route