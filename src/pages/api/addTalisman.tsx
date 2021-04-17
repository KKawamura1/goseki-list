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
    skill1Id: number | null;
    level1: number;
    skill2Id: number | null;
    level2: number;
    slot1: number;
    slot2: number;
    slot3: number;
  } = req.body; // TODO: typing
  console.log(data);
  const skill1 =
    data.skill1Id === null
      ? {}
      : {
          skill1: {
            connect: {
              id: data.skill1Id,
            },
          },
          level1: data.level1,
        };
  const skill2 =
    data.skill2Id === null
      ? {}
      : {
          skill2: {
            connect: {
              id: data.skill2Id,
            },
          },
          level1: data.level2,
        };
  const talisman = await prisma.talisman.create({
    data: {
      slot1: data.slot1,
      slot2: data.slot2,
      slot3: data.slot3,
      ...skill1,
      ...skill2,
    },
  });
  res.json({ talisman });
}
