const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({
                    _id: context.user._id
                });
                return foundUser;
            }
        },
    },
    Mutations: {
        addUser: async (parent, args) => {
            const user = await User.create(body);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, args) => {
            const user = await User.findOne(args.email);
            if (!user){
                new AuthenticationError("User not found!")
            }
            const correctPw = await user.isCorrectPassword(body.password);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args) => {
            console.log(user);
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
        deleteBook: async (parent, args) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
            return updatedUser;
        },
    }
}

module.exorts = resolvers;