require("dotenv").config();
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const mongoose = require("mongoose");
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const DB_URI = process.env.MONGODB_URI;

console.log("Connecting to", DB_URI);

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting MongoDB", err);
  });

mongoose.set("debug", true)
/* mongoose.set("debug", true); */

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log();
      if (!args.author & !args.genre) {
        return Book.find({});
      } else if (!!args.author & !!args.genre) {
        const populated_books = await Book.find({}).populate("author");
        return populated_books.filter(
          (a) => (a.author.name === args.author) & a.genres.includes(args.genre)
        );
      } else if (args.author) {
        const populated_books = await Book.find({}).populate("author");
        return populated_books.filter((a) => a.author.name === args.author);
      } else {
        const books = await Book.find({});
        console.log("books", books);
        return books.filter((a) => a.genres.includes(args.genre));
      }
    },
    allAuthors: () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({});
      const genres = books.map((book) => book.genres).flat();
      return [...new Set(genres)];
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Book: {
    author: async (root) => {
      const books = await Book.findOne({ title: root.title }).populate(
        "author"
      );
      return books.author;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      if (!author) {
        try {
          author = new Author({ name: args.author });
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      try {
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        });
        author.bookCount++
        await author.save();
        await book.save();

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ ...args });
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "aea") {
        throw new UserInputError("Wrong credentials");
      }
      const tokenInfo = {
        username: user.username,
        id: user._id,
      };
      console.log("user info", user);
      return { value: jwt.sign(tokenInfo, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});

(async () => {
  const books = await Book.findOne({ title: "Clean Code" }).populate("author");
  console.log("async func", books.author);
})();
