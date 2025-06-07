const { default: axios } = require("axios");

const GetAllYears = ()=>axios.get('/api/years');
const CreateNewStudent = (data)=> axios.post('/api/student',data);
const GetAllStudents = ()=>axios.get('/api/student/');
const DeleteStudentRecord= (id)=>axios.delete('/api/student?id='+id);
const GetAttendanceList=(year,month,subject)=>axios.get('/api/attendance?year='+year+'&month='+month+'&subject='+subject);
const MarkAttendance=(data)=>axios.post('/api/attendance',data);
const MarkAbsent=(studentId,day,date)=>axios.delete('/api/attendance?studentId='+studentId+'&day='+day+'&date='+date);
const TotalPresentCountByDay=(date,year)=>axios.get('/api/dashboard?date='+date+'&year='+year);
const GetAllSubjects = ()=>axios.get('/api/subjects');

export default{
    GetAllSubjects,
    GetAllYears,
    CreateNewStudent,
    GetAllStudents,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAttendance,
    MarkAbsent,
    TotalPresentCountByDay
}