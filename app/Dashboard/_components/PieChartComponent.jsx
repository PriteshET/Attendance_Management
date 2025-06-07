import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent({attendanceList}) {
    const [data,setData]=useState([])

    useEffect(()=>{
        console.log(attendanceList)
        if(attendanceList){
            const totalSt=getUniqueRecord(attendanceList);
            const today=moment().format('D');
            const PresentPerc=(attendanceList.length/(totalSt.length*Number(today))*100);
            setData([
                {
                    name:'Total Present',
                    value:Number(PresentPerc.toFixed(1)),
                    fill:'#4c8cf8'
                },
                {
                    name:'Total Absent',
                    value:100-Number(PresentPerc.toFixed(1)),
                    fill:'#1fe6d1'
                }
            ])
        }
    },[attendanceList])
  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-lg'>Monthly Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
        <PieChart width={730} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
        </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponent

// import React from 'react'
// import { Pie, PieChart } from 'recharts'

// function PieChartComponent() {
//     const data01 = [
//         {
//           "name": "Group A",
//           "value": 400
//         },
//         {
//           "name": "Group B",
//           "value": 300
//         },
//     ]
//   return (
//     <div>
//         <PieChart width={730} height={250}>
  
//             <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
//         </PieChart>
//     </div>
//   )
// }

// export default PieChartComponent