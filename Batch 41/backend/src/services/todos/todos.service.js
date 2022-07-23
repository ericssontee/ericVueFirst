// Initializes the `todos` service on path `/todos`
const { Todos } = require('./todos.class');
const createModel = require('../../models/todos.model');
const hooks = require('./todos.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['patch', 'remove'] // Need to add this if you want to execute it in multiple objects.
  };

  // Initialize our service with any options it requires
  app.use('/todos', new Todos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('todos');

  service.hooks(hooks);

  // service.publish('created', () => {
  //   return [
  //     app.channel('anonymous')
  //   ];
  // });

  service.publish(() => {
    return [
      app.channel('anonymous')
    ];
  });
};
