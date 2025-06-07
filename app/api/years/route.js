import { db } from "@/utils";
import { YEARS } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req){
    const result = await db.select().from(YEARS);
    return NextResponse.json(result);
}