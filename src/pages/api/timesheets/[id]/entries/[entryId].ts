import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";
import { mockUpdateEntry, mockDeleteEntry } from "@/services/mockTimesheetService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { id, entryId } = req.query;

  try {
    if (req.method === "PUT") {
      const result = await mockUpdateEntry(id as string, entryId as string, req.body);
      return res.status(200).json({ success: true, ...result });
    }

    if (req.method === "DELETE") {
      const result = await mockDeleteEntry(id as string, entryId as string);
      return res.status(200).json({ success: true, ...result });
    }

    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
}
