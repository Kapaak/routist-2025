import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { AuthOptions, getServerSession } from "next-auth";
import { getUserByEmail } from "~/prisma/api/user";
import { verifyPassword } from "~/utils/encryption";

type Credentials = {
  email: string;
  password: string;
};

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        const user = await getUserByEmail(email);

        if (!user) return null;

        const isPasswordValid = await verifyPassword(
          password,
          user?.password ?? ""
        );

        if (!isPasswordValid) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, token, user }) {
      // const email = token.email as string;
      // const name = token.name as string;

      // const userInDB = await getUserByEmail(email);

      // if (!userInDB) {
      //   const newUser = await createUser(email, name);
      //   session.user.id = newUser.id;

      //   return session;
      // }

      // session.user.id = userInDB.id;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  debug: process.env.NODE_ENV === "development",
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
