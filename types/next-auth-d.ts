import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      image:any
      name:any
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
    image:any
    name:any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    role: string;
    image:any
    name:any
  }
}
