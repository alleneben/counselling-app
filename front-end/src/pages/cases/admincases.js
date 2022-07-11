import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { DataTable, Button, Spinner } from '../../components';
import customStyles from './cases.module.scss';

const AdminCases = () => {
    const history = useHistory();
    const [data, setData] = useState([])
    const [isSubmitting, setisSubmitting] = useState(false)
    const [message, setMessage] = useState('')


    const initConfig={
        name:'Cases',
        header: ['Case Title', 'Date', 'Counselor', 'Status'],
        fieldnames:[{n:'title',f:'t'},{n:'casedate',f:'t'},{n:'counselerid',f:'t'},{n:'status',f:'t'}],
        actions:[{fn:'assign',path:'/app/dashboard/users/assign'}]
    }

    useEffect(()=> {

        fetchCases();

    },[])

    const fetchCases = async () => {
        setisSubmitting(true)
        
        let counseleeid = localStorage.getItem('counseleeid')

        let response = await fetch('http://localhost:5000/api/v1/listadmincases',{ 
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({})
        })
        response = await response.json()

        if(response.success){
            setData(response.data)
            setisSubmitting(false)
        }else {
            setisSubmitting(false)
            setMessage(response.message)
        }

    }

    const goToNewCase = () => {
        history.push('/app/dashboard/cases/addcase')
    }

    return (
        <div className={customStyles.tickets}>
            {/* <Button btntype="btn" btntext={'Create New Case'} onClick={() => goToNewCase()} style={{width: '150px', marginLeft:'auto', marginBottom: '20px'}}/> */}
            { data.length > 0 ? <DataTable config={initConfig} data={ data } /> : <h2>{ message }</h2> }
            { isSubmitting && <Spinner size="50px" color="#005087" /> }
        </div>
    )
}


export default AdminCases;