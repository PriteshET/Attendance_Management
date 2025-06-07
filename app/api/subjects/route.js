import { db } from "@/utils";
import { SUBJECTS } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req){
    const result = await db.select().from(SUBJECTS);
    return NextResponse.json(result);
}