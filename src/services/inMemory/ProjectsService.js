/* eslint-disable no-underscore-dangle *//* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ProjectsService {
  constructor() {
    this._projects = [{
      name: 'Proyek ABC',
      id: 'proyek-abc',
    }];

    this.getProjects = this.getProjects.bind(this);
  }

  addProject(name, description, budget, code, userId) {
    const id = `project-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const accessCode = (!code) ? code : nanoid(10);

    const newProject = {
      name, description, budget, id, createdAt, accessCode, userId,
    };

    this._projects.push(newProject);

    const isSuccess = this._projects.filter((project) => project.id === id).length > 0;

    if (!isSuccess) {
      console.log('eror+projects');
      throw new InvariantError('Catatan gagal ditambahkan');
    }
    return id;
  }

  getProjects() {
    // console.log(this._project);
    return this._projects;
  }

  getProjectById(id) {
    // console.log('nyampe gak');
    const project = this._projects.filter((n) => n.id === id)[0];

    if (!project) {
      // console.log('erorgetid');
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    // console.log('getid');
    return project;
  }

  editProjectById(id, { title, body, tags }) {
    const index = this._projects.findIndex((project) => project.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._projects[index] = {
      ...this._projects[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteProjectById(id) {
    const index = this._projects.findIndex((project) => project.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._projects.splice(index, 1);
  }
}

module.exports = ProjectsService;
