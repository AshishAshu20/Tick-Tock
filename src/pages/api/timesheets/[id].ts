import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { mockGetTimesheetById } from "@/services/mockTimesheetService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const result = await mockGetTimesheetById(id as string);
      return res.status(200).json({ success: true, ...result });
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    return res.status(404).json({ success: false, message: err.message });
  }
}
