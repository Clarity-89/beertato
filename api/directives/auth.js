const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver;
    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.user) {
        throw new AuthenticationError("Not authenticated");
      }
      return resolver(root, args, ctx, info);
    };
  }
}

module.exports.AuthenticationDirective = AuthenticationDirective;

class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver;
    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.user) {
        throw new AuthorizationError("Not authenticated");
      }

      if (!ctx.user.isAdmin) {
        throw new AuthorizationError("Not authorized");
      }
      return resolver(root, args, ctx, info);
    };
  }
}

module.exports.AuthorizationDirective = AuthorizationDirective;
