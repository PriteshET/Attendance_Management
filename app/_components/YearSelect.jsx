"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi';

function YearSelect({selectedYear}) {
    const [years,setGrades]=useState([]);

    useEffect(()=>{
        GetAllYearsList();
    },[])

    const GetAllYearsList=()=>{
        GlobalApi.GetAllYears().then(resp=>{
            setGrades(resp.data);
        })
    }

  return (
    <div>
        <select className='p-2 border rounded-lg'
        onChange={(e)=>selectedYear(e.target.value)}
        >
                {years.map((item,index)=>(
                    <option key={index} value={item.year}>{item.year}</option>
                ))}
        </select>
    </div>
  )
}

export default YearSelect