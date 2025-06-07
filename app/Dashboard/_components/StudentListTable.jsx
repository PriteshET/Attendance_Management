import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Button } from '@/components/ui/button.jsx';
import { Search, Trash } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
  
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];


function StudentListTable({ studentList,refreshData }) {
    
    const CustomButtons=(props)=>{
        return(
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <span>
                    <Button size="sm" variant="destructive"><Trash/></Button>
                    </span>  
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the record
                            and remove the data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        ) 
        
    }
    const [colDefs, setColDefs] = useState([
        {field:"id",filter: false},
        {field:"name",filter:true},
        {field:"department",filter:true},
        {field:"year",filter:true},
        {field: "action",cellRenderer:CustomButtons}
    ])

    const [rowData, setRowData] = useState();

    useEffect(()=>{
        studentList && setRowData(studentList)
    }, [studentList])

    const [searchInput,setSearchInput]=useState();
    
    const DeleteRecord=(id)=>{
        GlobalApi.DeleteStudentRecord(id).then(resp=>{
            if (resp){
                toast('Record Deleted Successfully !!')
                refreshData();
            }
        })
    }

  return (
    <div className='my-7'>
        <div
            // define a height because the Data Grid will fill the size of the parent container
            className='ag-theme-quartz'
            style={{ height: 500 }}
        >
            <div className='p-2 rounded-lg border
            shadow-sm flex gap-2 mb-2 max-w-sm'>
                <Search/>
                <input type="text" placeholder='Search for Anything in Table'
                className='outline-none w-full'
                onChange={(event)=>setSearchInput(event.target.value)}/>
            </div>
            <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    defaultColDef={{ filter: true, sortable: true }}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    </div>
  )
}

export default StudentListTable