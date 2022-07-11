import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { DataTable, Button, Spinner } from '../../components';
import customStyles from './users.module.scss';

const Users = () => {
    const history = useHistory();
    const [data, setData] = useState([])
    const [isSubmitting, setisSubmitting] = useState(false)
    const [message, setMessage] = useState('')


    const initConfig={
        name:'Users',
        header: ['Email', 'Role'],
        fieldnames:[{n:'email',f:'t'},{n:'role',f:'t'}],
        actions:[]
    }

    useEffect(()=> {

        fetchCases();

    },[])

    const fetchCases = async () => {
        setisSubmitting(true)
        
        let counseleeid = localStorage.getItem('counseleeid')

        let response = await fetch('http://localhost:5000/api/v1/listusers',{ 
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

    const goToAddUser = () => {
        history.push('/app/dashboard/users/adduser')
    }

    return (
        <div className={customStyles.tickets}>
            <Button btntype="btn" btntext={'Add User'} onClick={() => goToAddUser()} style={{width: '150px', marginLeft:'auto', marginBottom: '20px'}}/>
            { data.length > 0 ? <DataTable config={initConfig} data={ data } /> : <h2>{ message }</h2> }
            { isSubmitting && <Spinner size="50px" color="#005087" /> }
        </div>
    )
}


export default Users;