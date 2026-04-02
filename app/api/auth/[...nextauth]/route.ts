import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? 'mock_google_id',
      clientSecret: process.env.GOOGLE_SECRET ?? 'mock_google_secret',
    }),
    CredentialsProvider({
      name: 'Simulated Environment',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ALWAYS succeed for prototyping
        return {
          id: '1',
          name: 'Cán bộ Hải Quan (Demo)',
          email: 'canbo@customs.gov.vn',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Vietnam_Customs_Logo.svg/1024px-Vietnam_Customs_Logo.svg.png'
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        (token as any).accessToken = (account as any).access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).accessToken = (token as any).accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;