import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const YEARS=mysqlTable('years',{
    id:int('id',{length:11}).primaryKey(),
    year:varchar('year',{length:10}).notNull()
});

export const STUDENTS=mysqlTable('students',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    name:varchar('name',{length:50}).notNull(),
    department:varchar('dept',{length:50}).notNull(),
    year:varchar('year',{length:50}).notNull(),
})

export const SUBJECTS = mysqlTable('sujects',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    subject:varchar('subject',{length:12}).notNull()
})

export const ATTENDANCE = mysqlTable('attendance',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    studentId:int('studentId',{length:11}).notNull(),
    present:boolean('present').default(false),
    day:int('day',{length:11}).notNull(),
    subject:varchar('subject',{length:10}).notNull(),
    date:varchar('date',{length:20}).notNull()
});