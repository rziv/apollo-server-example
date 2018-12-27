const mocks = {
  String: () => "אבי",
  Query: {
    citizen: (_, { id }) => {
      return citizens.find(c => c.id == id);
    }
  },
  Citizen: {
    address: citizen => addresses.find(a => a.citizenId == citizen.id),
    idfRecord: citizen => IDFRecords.find(idfR => idfR.citizenId == citizen.id)
  },
  IDFRecord: {
    idfServedDays: idfRecord => idfRecord.servedDays
  }
};

exports.mocks = mocks;
