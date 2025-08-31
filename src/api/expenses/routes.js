const routes = (handler) => [
  {
    method: 'GET',
    path: '/expenses/dashboard',
    handler: handler.getDashboardDataHandlerByProjectId,
  },
  {
    method: 'GET',
    path: '/expenses/table/{projectId}',
    handler: handler.getListTableHandlerByProjectId,
  },
  {
    method: 'PUT',
    path: '/expenses/table/{expenseId}',
    handler: handler.putStatusExpenseById,
  },
];

module.exports = routes;
