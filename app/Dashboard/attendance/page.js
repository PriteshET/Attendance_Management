"use client"
import MonthSelection from '@/app/_components/MonthSelection'
import YearSelect from '@/app/_components/YearSelect'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import moment from 'moment/moment'
import AttendanceGrid from './_components/AttendanceGrid'
import SubjectSelect from '@/app/_components/SubjectSelect'
import { LoaderIcon } from 'lucide-react'

function Attendance() {
    const [selectedMonth,setSelectedMonth]=useState();
    const [selectedYear,setSelectedYear]=useState();
    const [selectedSubject,setSelectedSubject]=useState();
    const [attendanceList,setAttendanceList]=useState();
    const [loading,setLoading]=useState(false);
    
    const onSearchHandler=()=>{
        setLoading(true);
        const month=moment(selectedMonth).format('MM/YYYY');
        GlobalApi.GetAttendanceList(selectedYear,month,selectedSubject).then(resp=>{
            setAttendanceList(resp.data);
            setLoading(false);
        })
    }
    
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>Attendance</h2>

            <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
                <div className='flex gap-2 items-center'>
                    <label>Select Month:</label>
                    <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)}/>
                </div>
                <div className='flex gap-2 items-center'>
                    <label>Select Year:</label>
                    <YearSelect selectedYear={(v)=>setSelectedYear(v)}/>
                </div>
                <div className='flex gap-2 items-center'>
                    <label>Select Subject:</label>
                    <SubjectSelect selectedSubject={(s)=>setSelectedSubject(s)}/>
                </div>
                <Button
                onClick={()=>onSearchHandler()}
                disabled={loading}
                >
                    {loading ? <LoaderIcon className='animate-spin'/>:
                                "Search"}</Button>
            </div>
            <AttendanceGrid attendanceList={attendanceList}
            selectedMonth={selectedMonth}
            selectedSubject={selectedSubject}/>
            
    </div>
  )
}

export default Attendance