"use client"
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast, Toaster } from 'sonner';
import { Loader, LoaderIcon } from 'lucide-react';
  
function AddNewStudent({refreshData}) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [open,setOpen] = useState(false);
    const [years,setGrades]=useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        GetAllYearsList();
    },[])

    const GetAllYearsList=()=>{
        GlobalApi.GetAllYears().then(resp=>{
            setGrades(resp.data);
        })
    }

    const onSubmit=(data)=>{
        setLoading(true);
        console.log("FormData",data);
        GlobalApi.CreateNewStudent(data).then(resp=>{
            console.log("--",resp);
            if(resp.data){
                reset();
                refreshData();
                setOpen(false);
                toast("New Student Added !")
            }
            setLoading(false)
        })
    }
  return (
    <div>
        <Button onClick={()=>setOpen(true)}>+ Add New Student</Button>
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='py-2'>
                                <label>Full Name</label>
                                <Input placeholder="Ex. Vikas Zende"
                                {...register('name', {required:true})}
                                />
                            </div>
                            <div className='py-2'>
                                <label>Roll No.</label>
                                <Input type = "Number" placeholder="Ex.501"
                                {...register('id', {required:true})}
                                />
                            </div>
                            <div className='flex flex-col py-2'>
                                <label>Department</label>
                                <select className='p-2 border rounded-lg'
                                {...register('dept', {required:true})}>
                                    <option value={'EXTC'}>EXTC</option>
                                    <option value={'COMPS'}>COMPS</option>
                                    <option value={'MECH'}>MECH</option>
                                    <option value={'IT'}>IT</option>
                                </select>
                            </div>
                            <div className='flex flex-col py-2'>
                                <label>Year</label>
                                <select className='p-2 border rounded-lg'
                                {...register('year', {required:true})}>
                                        {years.map((item,index)=>(
                                            <option key={index} value={item.year}>{item.year}</option>
                                        ))}
                                </select>
                                
                            </div>
                            <div className='flex gap-3 items-center justify-end mt-5'>
                                <Button type="button"
                                onClick={()=>setOpen(false)} variant="ghost">Cancel</Button>
                                <Button 
                                type="submit"
                                disabled={loading}
                                >
                                    {loading ? <LoaderIcon className='animate-spin'/>:
                                    "Save"}</Button>
                            </div>
                        </form>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewStudent
