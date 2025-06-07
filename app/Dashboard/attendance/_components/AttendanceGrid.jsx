"use client"
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function AttendanceGrid({attendanceList,selectedMonth,selectedSubject}) {

    const [rowData,setRowData]=useState();
    const [colDefs,setColDefs]=useState([
        {field:'studentId',filter: true},
        {field:'name',filter: true}
    ]);

    const daysInMonth=(yr,month)=>new Date(yr,month+1,0).getDate();
    const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'));
    const daysArrays=Array.from({length:numberOfDays},(_,i)=>i+1);

    useEffect(()=>{
        if(attendanceList){
            const userList=getUniqueRecord(attendanceList);
            setRowData(userList);

            daysArrays.forEach((date)=>{
                setColDefs(prevData=>[...prevData,{
                    field:date.toString(),width:50,editable:true
                }])

                userList.forEach(obj=>{
                    obj[date]=isPresent(obj.studentId,date)
                })
            })
        }
    },[attendanceList])

    const isPresent=(studentId,day)=>{
        const result=attendanceList.find(item=>item.day==day&&item.studentId==studentId);
        return result?true : false;
    }

    const onMarkAttendance=(day,studentId,presentStatus)=>{
        const date=moment(selectedMonth).format('MM/yyyy');
        if(presentStatus){
            const data={
                day:day,
                subject:selectedSubject,
                studentId:studentId,
                present:presentStatus,
                date:date
            }
            GlobalApi.MarkAttendance(data).then(resp=>{
                toast("Student Id:"+studentId+"Marked as Present")
            })
        }
        else{
            GlobalApi.MarkAbsent(studentId,day,date).then(resp=>{
                toast("Student Id:"+studentId+"Marked as Absent")
            })
        }

    }
  return (
    <div>
        <div
            // define a height because the Data Grid will fill the size of the parent container
            style={{ height: 500 }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    </div>
  )
}

export default AttendanceGrid