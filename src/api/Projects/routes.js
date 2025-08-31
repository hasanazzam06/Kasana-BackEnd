const routes = (handler) => [
  {
    method: 'GET',
    path: '/projects/{userId}',
    handler: handler.tes,
  },
  {
    method: 'POST',
    path: '/projects/{userId}',
    handler: handler.addProjectHandler,
  },
];

module.exports = routes;
