import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Field, Button, Modal } from '../../components';
import utilstyle from '../../asset/scss/util.module.scss';
import customStyles from './addcase.module.scss';
import styles from '../../asset/scss/forms.module.scss';
// import VisaIcon from '../../asset/icons/visa.png'; 
// import MasterCardIcon from '../../asset/icons/mastercard.png'; 


const Addcase = () => {
    const history = useHistory()
    const [message, setMessage] = useState('')
    const [modalstate, setModalState] = useState('hide')
    const [isSubmitting, setisSubmitting] = useState(false)
    const [title, setTitle ] = useState('')
    const [description, setDescription ] = useState('')



    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }


    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = async (e,fn) => {
        e.preventDefault()

        setisSubmitting(true)
        
        let counseleeid = localStorage.getItem('counseleeid')

        let response = await fetch('http://localhost:5000/api/v1/addcase',{ 
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({title: title, description: description, counseleeid: counseleeid})
        })
        response = await response.json()

        if (response.success) {
            setMessage(response.message)
        }
        else {
            setMessage(response.message)
        }
        setModalState('show')
        setisSubmitting(false)
    }
    
    const cancel = () => {
        history.push('/app/dashboard/cases')
    }
    const onHide = () => {
        history.push('/app/dashboard/cases')
        setModalState('hide')
    }
    return (
        <div className={customStyles.donate}>
            <Card className={utilstyle.card} id={customStyles.payment} style={{maxWidth: "510px"}}>
                <CardHeader className={utilstyle.cardheader}>
                    <h5>Case Details</h5>
                </CardHeader>
                <CardBody className={utilstyle.cardbody}>
                    {/* <div className={customStyles.icons}>
                        <img src={MasterCardIcon} alt="MASTERCARD ICON" />
                        <img src={VisaIcon} alt="VISA ICON" />
                    </div> */}
                    <Field 
                        label={"Case Title"} 
                        id={'title'} 
                        type={'text'} 
                        placeholder={'Drug Abuse'} 
                        fieldtype={'tt'} 
                        onChange={onChangeTitle} 
                        required={true} 
                        styles={styles} 
                        style={{ marginBottom:'20px'}}
                        disabled={false}
                    />
                    <Field 
                    label={'Description'} 
                    id={'description'} 
                    type={'text'} 
                    placeholder={'Give a full description of your case'} 
                    fieldtype={'ta'} 
                    onChange={onChangeDescription}
                    required={true} 
                    styles={styles} 
                    style={{ marginBottom:'20px'}}
                    disabled={false}
                    rows={"10"}
                    />
                </CardBody>
                <CardFooter className={utilstyle.cardfooter}>
                    <Button btntype="btn btn-clear" btntext={'Cancel'} onClick={() => cancel()} style={{width: "50%", marginRight:10}}/>
                    <Button btntype="btn" btntext={'Save'} onClick={handleSubmit} isSubmitting={isSubmitting} style={{width: "50%"}}/>
                </CardFooter>   
            </Card>
            <Modal status={modalstate} onHide={onHide} title='Message' handleSubmit={''} submitting={""} fns={[]}>
                { message.split('::')[0] } <h3>{ message.split('::')[1] }</h3>
            </Modal>
        </div>
    )
}


export default Addcase;