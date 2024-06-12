import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      let _path = req.nextUrl.pathname;

      // `/admin` requires admin role
      if (_path.startsWith("/admin")) {
        return token.user?.isAdmin;
      }
      // // `/me` only requires the user to be logged in
      return !!token;
    }
  }
});

export const config = {
  matcher: ["/admin/:path*", "/me/:path*", "/checkout/:path*"]
};
