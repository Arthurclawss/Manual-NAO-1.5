import { toNextJsHandler } from "better-auth/next-js";
import { getServices } from "@/lib/session";

const handleAuth = toNextJsHandler(async (request) => {
  const { auth } = await getServices();
  return auth.handler(request);
});

export const { GET, POST } = handleAuth;
