import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const adminEmail = process.env.ADMIN_EMAIL || "admin@thexonca.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "xonca-admin-2026";

        if (
          parsed.data.email === adminEmail &&
          parsed.data.password === adminPassword
        ) {
          return {
            id: "admin-demo",
            email: parsed.data.email,
            name: "Xonca Admin",
            role: "SUPER_ADMIN",
          };
        }

        if (!process.env.DATABASE_URL) return null;

        try {
          const { prisma } = await import("@/lib/db/prisma");
          const user = await prisma.user.findUnique({
            where: { email: parsed.data.email },
          });
          if (!user?.passwordHash) return null;

          const bcrypt = await import("bcryptjs");
          const valid = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash,
          );
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "CLIENT";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string) ?? "CLIENT";
      }
      return session;
    },
  },
});
