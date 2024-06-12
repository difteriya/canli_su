import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { models } from "../../../db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "my-project",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await models.users.findOne({
          where: { email },
          raw: true
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("me:form-invalid-credentials");
        }
        return {
          id: user.id,
          name: user.first_name,
          email: user.email,
          isAdmin: user.is_admin,
          status: user.status
        };
      }
    })
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development"
};

export default NextAuth(authOptions);
