import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  mockGetTimesheets,
  mockCreateTimesheet,
} from "@/services/mockTimesheetService";
import type { TimesheetFilters } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    if (req.method === "GET") {
      const { page = "1", limit = "5", status = "", startDate = "", endDate = "" } = req.query;
      const filters: TimesheetFilters = {
        status: (status as string) as TimesheetFilters["status"],
        startDate: startDate as string,
        endDate: endDate as string,
      };
      const result = await mockGetTimesheets(Number(page), Number(limit), filters);
      return res.status(200).json({ success: true, ...result });
    }

    if (req.method === "POST") {
      const result = await mockCreateTimesheet(req.body);
      return res.status(201).json({ success: true, ...result });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
}
