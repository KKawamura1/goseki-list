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
  const data: {
    skill1Id: number;
    level1: number;
    skill2Id: number;
    level2: number;
    slot1: number;
    slot2: number;
    slot3: number;
  } = req.body; // TODO: typing
  const talisman = await prisma.talisman.create({
    data: { ...data },
  });
  res.json({ talisman });
}
