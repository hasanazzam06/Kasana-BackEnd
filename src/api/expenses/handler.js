/* eslint-disable no-underscore-dangle */
class ExpensesHandler {
  constructor(service) {
    this._service = service;
    this._name = 'tes aja';

    this.getDashboardDataHandlerByProjectId = this.getDashboardDataHandlerByProjectId.bind(this);
    this.getListTableHandlerByProjectId = this.getListTableHandlerByProjectId.bind(this);
  }

  async getDashboardDataHandlerByProjectId(request, h) {
    // console.log('tes api');
    const result = `${this._name} berhasil`;
    const dashboardData = this._service.getDashboardDataByProjectId();

    // console.log(dashboardData);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        result,
        dashboardData,
      },
    });
    response.code(201);
    return response;
  }

  async getListTableHandlerByProjectId(request, h) {
    const { projectId } = request.params;
    const expenses = this._service.getListTableByProjectId(projectId);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        expenses,
      },
    });
    response.code(201);
    return response;
  }

  async putStatusExpenseById(request, h) {
    const { expenseId } = request.params;

    this._service.verifyExpenseById(expenseId);

    const response = h.response({
      status: 'success',
      message: 'pengeleurana berhasil di verivication',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExpensesHandler;
