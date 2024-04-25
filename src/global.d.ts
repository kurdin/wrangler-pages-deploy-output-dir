import {} from "hono";
import { PrismaClient } from "@prisma/client";

type Head = {
  title?: string;
};

declare module "hono" {
  interface Env {
    Variables: {
      prisma: PrismaClient;
    };
    Bindings: {
      DB: D1Database;
    };
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head):
      | Response
      | Promise<Response>;
  }
}
