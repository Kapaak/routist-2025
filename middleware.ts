export { default } from "next-auth/middleware";

//TODO: not working now - https://next-auth.js.org/configuration/nextjs

//Pages that should be protected by the middleware
export const config = { matcher: ["/locations"] };
