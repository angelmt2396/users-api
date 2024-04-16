export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getByIndex(index) {
    return await this.model.User.findOne(index);
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(entity) {
    return await this.model.insertOne(entity);
  }

  async update(id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async findAll() {
    return await this.model.find();
  }
}
