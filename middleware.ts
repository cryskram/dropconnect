export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/:path*", "/user/settings/:id*"],
  // matcher: ["/auth/profile"],
};
