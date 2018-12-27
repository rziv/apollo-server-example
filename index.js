const { preload } = require("./preload");
const { idfAPI } = require("./RestAPI/idfAPI");
const { addressAPI } = require("./RestAPI/addressAPI");
const { ApolloServer, gql } = require("apollo-server");

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type Citizen {
    id: Int!
    firstName: String
    lastName: String
    address: Address
    idfRecord: IDFRecord
  }

  type Address {
    """
    כתובת האזרח כפי שרשומה ברשות האוכלוסין
    """
    id: Int!
    city: String
    street: String
    citizen: Citizen
  }

  type IDFRecord {
    id: Int!
    idfServedDays: [IDFServedDays]
    citizen: Citizen
  }

  type IDFServedDays {
    year: Int
    days: Int
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    citizen(id: Int!): Citizen
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    citizen: (_, { id }) => {
      return preload.citizens.find(c => c.id == id);
    }
  },
  Citizen: {
    address: async function(citizen, _, { dataSources }) {
      return dataSources.addressAPI.getAddress(citizen.id);
    },
    idfRecord: async (citizen, _, { dataSources }) =>
      dataSources.idfAPI.getIDFRecord(citizen.id)
  },
  IDFRecord: {
    idfServedDays: idfRecord => idfRecord.servedDays
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      idfAPI: new idfAPI(),
      addressAPI: new addressAPI()
    };
  },
  formatError: error => {
    console.log(error);
    return error;
  },
  context: ({ req }) => ({
    idNum: req.headers.idNum
  })
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
