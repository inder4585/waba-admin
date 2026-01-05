import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: string;
      token: string;
      credits: number;
      firstName: string;
      lastName: string;
      mfaEnabled: boolean;
      mfaMethod: string | null;
      regdate: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    token: string;
    credits: number;
    firstName: string;
    lastName: string;
    mfaEnabled: boolean;
    mfaMethod: string | null;
    regdate: string;
    profilePicture?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    role: string;
    token: string;
    credits: number;
    firstName: string;
    lastName: string;
    mfaEnabled: boolean;
    mfaMethod: string | null;
    regdate: string;
  }
}
