"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi';

function SubjectSelect({selectedSubject}) {
    const [subjects,setSubjects]=useState([]);

    useEffect(()=>{
        GetAllSubjectsList();
    },[])

    const GetAllSubjectsList=()=>{
        GlobalApi.GetAllSubjects().then(resp=>{
            setSubjects(resp.data);
        })
    }
  return (
    <div>
        <select className='p-2 border rounded-lg'
        onChange={(e)=>selectedSubject(e.target.value)}
        >
                {subjects.map((item,index)=>(
                    <option key={index} value={item.subject}>{item.subject}</option>
                ))}
        </select>
    </div>
  )
}

export default SubjectSelect