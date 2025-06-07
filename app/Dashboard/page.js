"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection';
import YearSelect from '../_components/YearSelect';
import GlobalApi from '../_services/GlobalApi';
import moment from 'moment/moment';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';
import PieChartComponent from './_components/PieChartComponent';
import SubjectSelect from '../_components/SubjectSelect';

function Dashboard() {
  const [selectedMonth,setSelectedMonth]=useState();
  const [selectedYear,setSelectedYear]=useState();
  const [attendanceList,setAttendanceList]=useState();
  const [totalPresentData,setTotalPresentData]=useState([]);
  const [selectedSubject,setSelectedSubject]=useState();

  useEffect(()=>{
    // setTheme('system');
    GetTotalPresentCountByDay();
    getStudentAttendance();
  },[selectedMonth||selectedYear])


  const getStudentAttendance=()=>{
    GlobalApi.GetAttendanceList(selectedYear,moment(selectedMonth).format('MM/yyyy'),selectedSubject)
    .then(resp=>{
      setAttendanceList(resp.data);
    })
  }

  const GetTotalPresentCountByDay=()=>{
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectedYear)
    .then(resp=>{
      setTotalPresentData(resp.data);
    })
  }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth}/>
          <YearSelect selectedYear={setSelectedYear}/>
          {/* <SubjectSelect selectedSubject={setSelectSubject}/> */}
        </div>
      </div>
      <StatusList attendanceList={attendanceList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='md:col-span-2'>
          <BarChartComponent attendanceList={attendanceList}
          totalPresentData={totalPresentData}/>
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList}/>
        </div>
      </div>
    </div>

  )
}

export default Dashboard