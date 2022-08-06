const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({ _id: context.user._id });
                return foundUser;
            }
            throw new AuthenticationError('Your not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, pasword }) => {
            const user = await User.create({ username, email, pasword });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('User not found!')
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Password not found!')
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Your not logged in!')
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Your not logged in!')
        }
    }
};

module.exorts = resolvers;