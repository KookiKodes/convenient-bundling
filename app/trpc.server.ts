import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { initTRPC } from "@trpc/server";
import { authenticate } from "~/shopify.server";
import { z } from "zod";

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const ctx = await authenticate.admin(req);
  return ctx;
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

const publicProcedure = t.procedure;

export const appRouter = t.router({
  hello: publicProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
    return `Hello! ${input}`;
  }),
});

export type AppRouter = typeof appRouter;
