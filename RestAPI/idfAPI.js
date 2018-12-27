const { RESTDataSource } = require("apollo-datasource-rest");

class idfAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
  }

  async getIDFRecord(id) {
    const data = await this.get(`idfRecords?citizenId=${id}`);
    return data ? data[0] : null;
  }
}

exports.idfAPI = idfAPI;
