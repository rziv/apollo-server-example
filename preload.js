// This is a (sample) collection of citizens we'll be able to query
// the GraphQL server for.
const citizens = [
  {
    id: 1,
    firstName: "אבי",
    lastName: "כהן",
    addressId: 10,
    IDFId: 100
  },
  {
    id: 2,
    firstName: "בני",
    lastName: "לוי",
    addressId: 20,
    IDFId: 200
  }
];

const IDFRecords = [
  {
    id: 100,
    citizenId: 1,
    servedDays: [{ year: 2017, days: 20 }, { year: 2018, days: 0 }]
  },
  {
    id: 200,
    citizenId: 2,
    servedDays: [{ year: 2017, days: 0 }, { year: 2018, days: 16 }]
  }
];

const addresses = [
  { id: 10, citizenId: 1, city: "חיפה", street: "יפו" },
  { id: 20, citizenId: 2, city: "תל אביב", street: "הירקון" }
];

exports.preload = {
  citizens,
  IDFRecords,
  addresses
};
