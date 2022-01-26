const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get a single user
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({_id: context.user._id})
      } 
      throw new AuthenticationError("Cannot find a user with this id!")
    }
  },

  Mutation: {
    // login a user, sign a token, and send it back
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Create a new user, sign a token and send it back
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true }
          );
        }
        throw new AuthenticationError("Couldn't find user with this id!");

    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        // const emailValidate = context.user.email;
        return User.findOneAndUpdate(
          { email: context.user.email },
          {
            $pull: {
              savedBook: {
                bookId: bookId
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!")
    },
  },
};

module.exports = resolvers;