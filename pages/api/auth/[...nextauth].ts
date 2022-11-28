import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from 'lib/mongodb';
/**/
/*
api::NextAuth() api::NextAuth()

NAME

        NextAuth(context)
          - Creates the logic of logging in.

SYNOPSIS

        getStaticProps(context)
            adapter             --> adapter to pull the data from.
            providers             --> types of login supported provider.
            callbacks             --> callbacks to set the session username.

DESCRIPTION

        Creates the logic of logging in as it crates a nextauth object that is
        linked to the login button and provides the logic to login
        via the listed providers and the data in the provided database.
*/
/**/
export default NextAuth({
  // adapter of type MongoDBAdapter to clientPromise
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GitHubProvider implementation
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          followers: profile.followers,
          verified: true
        };
      }
    }),
    // GoogleProvider implementation
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // Callbacks for all callbacks.
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.username = user.username;
      return session;
    }
  }
});
