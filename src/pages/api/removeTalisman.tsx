import { PrismaClient } from "@prisma/client";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: typeof cors
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const { talismanId }: { talismanId: number } = req.body;
  const talisman = await prisma.talisman.delete({
    where: {
      id: talismanId,
    },
  });
  res.json({ talisman });
}
