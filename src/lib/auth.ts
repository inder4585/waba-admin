import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

import { NextAuthOptions } from 'next-auth';
import { API_CONTENT } from '@/utils/api_content';
import axios from 'axios';
import { handleError } from '@/utils/axiosError';
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),

    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          console.log(
            '`${process.env.NEXT_PUBLIC_SITE_URL}${API_CONTENT.api.login}`',
            `${process.env.NEXT_PUBLIC_SITE_URL}${API_CONTENT.api.login}`
          );
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SITE_URL}${API_CONTENT.api.login}`,
            {
              email: credentials.email?.trim(),
              password: credentials.password?.trim(),
            }
          );
          console.log('Login response:', response.data);
          const user = response.data?.user;

          if (!user) {
            throw new Error('Invalid login response');
          }
          console.log('User data:', user);

          return {
            id: user.id,
            email: user?.email,
            firstName: `${user?.firstName} `,
            lastName: `${user?.lastName}`,
            image: user?.profilePicture,
            role: user?.role || 'USER',
            token: user.token,
            credits: user?.credits || user?.creditAssign || 0,
            mfaEnabled: user?.mfaEnabled || false,
            mfaMethod: user?.mfaMethod || null,
            regdate: user?.regdate || null,
          };
        } catch (error) {
          handleError(error, 'Login failed');
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          const googleProfile = profile as {
            given_name?: string;
            family_name?: string;
            email?: string;
            picture?: string;
          };
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SITE_URL}${API_CONTENT.api.google_login}`,
            {
              provider: account.provider,
              email: user.email,
              firstName: googleProfile.given_name || '',
              lastName: googleProfile.family_name || '',
              profilePicture: user.image,
            }
          );
          const savedUser = res.data?.data;
          if (!savedUser) return false;
          user.id = savedUser.user.id || 0;
          user.firstName = savedUser.user.firstName || '';
          user.lastName = savedUser.user.lastName || '';
          user.role = savedUser.user.role || 'USER';
          user.token = savedUser.token;
          user.credits = savedUser.user.credits || 0;
          user.image = savedUser.user.profilePicture || '';
          user.mfaEnabled = savedUser.user.mfaEnabled || false;
          user.mfaMethod = savedUser.user.mfaMethod || null;
          user.regdate = savedUser.user.regdate || null;
        }

        return true;
      } catch (err) {
        console.error('OAuth login error:', err);
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
        token.credits = user.credits || 0;
        token.id = user.id || '';
        token.firstName = user.firstName || '';
        token.lastName = user.lastName || '';
        token.mfaEnabled = user.mfaEnabled || false;
        token.mfaMethod = user.mfaMethod || null;
        token.image = user.image || '';
        token.regdate = user.regdate || '';
      }
      if (trigger === 'update' && session) {
        token = {
          ...token,
          image: session?.image,
          firstName: session.firstName,
          lastName: session.lastName,
          user: session,
        };
        return token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || 'USER';
        session.user.credits = token.credits || 0;
        session.user.token = token.token;
        session.user.id = token.id || '';
        session.user.image = token.image || '';
        session.user.firstName = token.firstName || '';
        session.user.lastName = token.lastName || '';
        session.user.mfaEnabled = token.mfaEnabled || false;
        session.user.mfaMethod = token.mfaMethod || 'authenticator';
        session.user.regdate = token.regdate || '';
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
  },

  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },

  debug: true,
};

const JWT_SECRET = process.env.JWT_SECRET!;
