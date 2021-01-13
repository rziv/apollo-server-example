const { SchemaDirectiveVisitor } = require("apollo-server");
const { GraphQLScalarType, GraphQLNonNull } = require('graphql');

module.exports = class RestrictedDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field) {
    this.wrapType(field);
  }

  visitFieldDefinition(field) {
    this.wrapType(field);
  }

  // Replace field.type with a custom GraphQLScalarType that flags 
  // the field as restricted
  wrapType(field) {
    if (
      field.type instanceof GraphQLNonNull &&
      field.type.ofType instanceof GraphQLScalarType
    ) {
      field.type = new GraphQLNonNull(
        new RestrictedFieldType(field.type.ofType, this.args.owner),
      );
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new RestrictedFieldType(field.type, this.args.owner);
    } else {
      throw new Error(`Not a scalar type: ${field.type}`);
    }
  }
}

class RestrictedFieldType extends GraphQLScalarType {
  constructor(type, owner) {
    super({
      name: `${type}_Restricted${owner? '_'+owner:''}`,

      // For more information about GraphQLScalar type (de)serialization,
      // see the graphql-js implementation:
      // https://github.com/graphql/graphql-js/blob/31ae8a8e8312/src/type/definition.js#L425-L446

      serialize(value) {
        value = type.serialize(value);        
        return value;
      },

      parseValue(value) {
        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast);
      },
    });
  }
}

