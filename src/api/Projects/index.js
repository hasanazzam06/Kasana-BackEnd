const ProjectsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'projects',
  version: '1.0.0',
  register: async (server, { service }) => {
    const projectsHandler = new ProjectsHandler(service);
    server.route(routes(projectsHandler));
  },
};
