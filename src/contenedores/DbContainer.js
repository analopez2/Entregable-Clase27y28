class DbContainer {
  constructor(knex, tableName) {
    this.knex = knex;
    this.tableName = tableName;
  }

  async save(element) {
    let lastInsertId = await this.knex.insert(element).into(this.tableName);
    return lastInsertId[0];
  }

  async getAll() {
    let rows = await this.knex.select('*').from(this.tableName);
    return rows;
  }

  async getById(id) {
    let row = await this.knex.select('*').from(this.tableName).where('id', '=', id);
    return row;
  }

  async update(element, id) {
    let elementById = await this.getById(id);
    if (elementById) {
      await this.knex
        .from(this.tableName)
        .where('id', '=', id)
        .update({ ...element.id, ...element });

      let elementUpdate = await this.getById(id);
      return elementUpdate;
    } else {
      throw { error: `Element with Id: ${id} not found` };
    }
  }

  async deleteById(id) {
    await this.knex.from(this.tableName).where('id', '=', id).del();

    let data = await this.getAll();
    return data;
  }
}

export { DbContainer };
