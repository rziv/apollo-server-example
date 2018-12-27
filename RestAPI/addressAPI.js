const { RESTDataSource } = require("apollo-datasource-rest");

class addressAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
  }

  async getAddress(id) {
    const data = await this.get(`addresses?citizenId=${id}`);
    return data ? data[0] : null;
  }
}

exports.addressAPI = addressAPI;
