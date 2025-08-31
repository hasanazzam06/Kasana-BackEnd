/* eslint-disable no-underscore-dangle */
class NotesHandler {
  constructor(service) {
    this._service = service;
    this._name = 'tes aja';

    this.tes = this.tes.bind(this);
    this.addProjectHandler = this.addProjectHandler.bind(this);
  }

  async tes(request, h) {
    const { userId } = request.params;

    // console.log('tes api');
    const result = `${this._name} berhasil`;
    const projects = this._service.getProjects();

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        result,
        userId,
        projects,
      },
    });
    response.code(201);
    return response;
  }

  async addProjectHandler(request, h) {
    // console.log(request.payload);
    const {
      name, description, budget, accessCode: code,
    } = request.payload;

    // console.log(`${name}lala${budget}`);

    const { userId } = request.params;

    const id = this._service.addProject(name, description, budget, code, userId);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        name,
        id,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = NotesHandler;
