import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { initTRPC } from "@trpc/server";
import { authenticate } from "~/shopify.server";

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const ctx = await authenticate.webhook(req);
  return ctx;
}

export type WebhookContext = inferAsyncReturnType<typeof createContext>;

export const wt = initTRPC.context<WebhookContext>().create();

const publicProcedure = wt.procedure;

export const webhookRouter = wt.router({});

export type AppRouter = typeof webhookRouter;
