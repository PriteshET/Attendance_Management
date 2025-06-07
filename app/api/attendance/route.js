import Attendance from "@/app/Dashboard/attendance/page";
import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
    const searchParams=req.nextUrl.searchParams;
    const year=searchParams.get('year');
    const month=searchParams.get('month');
    const subject=searchParams.get('subject');
    const result=await db.select({
        name:STUDENTS.name,
        present:ATTENDANCE.present,
        day:ATTENDANCE.day,
        date:ATTENDANCE.date,
        year:STUDENTS.year,
        studentId:STUDENTS.id,
        AttendanceId:ATTENDANCE.id,
        subject:ATTENDANCE.subject
    }).from(STUDENTS)
    .leftJoin(ATTENDANCE,and(eq(STUDENTS.id,ATTENDANCE.studentId),eq(ATTENDANCE.date,month),eq(ATTENDANCE.subject,subject)))
    .where(eq(STUDENTS.year,year))

    return NextResponse.json(result);
}

export async function POST(req,res){
    const data=await req.json();
    const result=await db.insert(ATTENDANCE)
    .values({
        studentId:data.studentId,
        present:data.present,
        day:data.day,
        subject:data.subject,
        date:data.date
    })
    return NextResponse.json(result);
}

export async function DELETE(req){
    const searchParams=req.nextUrl.searchParams;
    const studentId=searchParams.get('studentId');
    const date=searchParams.get('date');
    const day=searchParams.get('day');

    const result=await db.delete(ATTENDANCE)
        .where(
            and(
                eq(ATTENDANCE.studentId,studentId),
                eq(ATTENDANCE.day,day),
                eq(ATTENDANCE.date,date)
            )
        )

    return NextResponse.json(result);
}