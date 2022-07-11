
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Field, Button, Modal } from '../../../components';

import utilstyle from '../../../asset/scss/util.module.scss';
import styles from '../../../asset/scss/forms.module.scss';
import customStyles from './thread.module.scss';

const Thread = () => {
    let location = useLocation();
    const { item } = location.state;


    const [toggle, setToggle] = useState(false);
    const [threads, setThreads] = useState(JSON.parse(item.thread[0]))
    const [rerender, setRerender] = useState(false);
    const [message, setMessage] = useState('')
    const [modalstate, setModalState] = useState('hide')
    const [isSubmitting, setisSubmitting] = useState(false)
    const [description, setDescription ] = useState('')

    // let threads = JSON.parse(item.thread[0])
    

    useEffect(() => {
        fetchThread()
    },[rerender])

    const fetchThread = async () => {
        setisSubmitting(true)
        
        let counseleeid = localStorage.getItem('counseleeid')

        let response = await fetch('http://localhost:5000/api/v1/listthreads',{ 
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({caseid: item._id})
        })
        response = await response.json()

        if(response.success){
            setThreads(response.data)
            setisSubmitting(false)
            setModalState('show')
            setToggle(false)
        }else {
            setisSubmitting(false)
            setMessage(response.message)
            setModalState('show')
        }

    }
    
    const toggleReply = () => {
        setToggle(!toggle)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = async (e,fn) => {
        e.preventDefault()

        setisSubmitting(true)
        
        let role = localStorage.getItem('role');

        let counselorid = "";
        let counseleeid = ""
        if(role === 'counselee'){
            counseleeid = localStorage.getItem('counseleeid')

        } else {
            counselorid = localStorage.getItem('counseleeid')
        }

        let response = await fetch('http://localhost:5000/api/v1/addthread',{ 
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({description: description, counseleeid: counseleeid, counselorid:counselorid, caseid: item._id})
        })
        response = await response.json()

        if (response.success) {
            setMessage(response.message)
            setRerender(!rerender)
        }
        else {
            setMessage(response.message)
        }
        setModalState('show')
        setisSubmitting(false)
    }
    
    const cancel = () => {
        setToggle(false)
    }
    const onHide = () => {
        // history.push('/app/dashboard/cases')
        setModalState('hide')
    }

    return(
        <div className="container">
            <h1>Threads for { item.title}</h1>
            <div className={customStyles["thread-container"]}>
                {
                    threads.map((thread, index) => {
                        return <div className={`${customStyles["message"]} ${thread.counseleeid ? customStyles["me"] : customStyles["counselor"]}`} key={`thread-${index}`}>
                            { thread.message}
                            
                            <div className={customStyles["thread-footer"]}>
                                <div className={customStyles['threaddate']}> Date: { thread.threaddate } </div>
                                <div className={customStyles['threaddate']}> From: { thread.counseleeid ? 'Me' : 'Counselor' } </div>
                            </div>
                        </div>

                    })
                }
                {
                    toggle && <div>
                        <Card className={utilstyle.card} id={customStyles.payment} style={{maxWidth: "510px"}}>
                <CardHeader className={utilstyle.cardheader}>

                </CardHeader>
                <CardBody className={utilstyle.cardbody}>
                    <Field 
                    label={'Reply'} 
                    id={'description'} 
                    type={'text'} 
                    placeholder={'Type your reply'} 
                    fieldtype={'ta'} 
                    onChange={onChangeDescription}
                    required={true} 
                    styles={styles} 
                    style={{ marginBottom:'20px'}}
                    disabled={false}
                    rows={"5"}
                    />
                </CardBody>
                <CardFooter className={utilstyle.cardfooter}>
                    <Button btntype="btn btn-clear" btntext={'Cancel'} onClick={() => cancel()} style={{width: "50%", marginRight:10}}/>
                    <Button btntype="btn" btntext={'Save'} onClick={handleSubmit} isSubmitting={isSubmitting} style={{width: "50%"}}/>
                </CardFooter>   
            </Card>
            {/* <Modal status={modalstate} onHide={onHide} title='Message' handleSubmit={''} submitting={""} fns={[]}>
                { message }
            </Modal> */}
                    </div>
                }
                <Button btntype="btn" btntext={'Reply'} onClick={() => toggleReply()} style={{width: '150px', marginLeft:'auto', marginBottom: '20px'}}/>      
            </div>
        </div>
    )
}


export default Thread;