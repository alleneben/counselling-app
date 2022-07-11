import { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Field, Button, Modal } from '../../components';
import utilstyle from '../../asset/scss/util.module.scss';
import customStyles from './adduser.module.scss';
import styles from '../../asset/scss/forms.module.scss';
// import VisaIcon from '../../asset/icons/visa.png'; 
// import MasterCardIcon from '../../asset/icons/mastercard.png'; 


const Assign = () => {
    const history = useHistory()
    const [message, setMessage] = useState('')
    const [modalstate, setModalState] = useState('hide')
    const [isSubmitting, setisSubmitting] = useState(false)
    const [ email, setEmail ] = useState(null)

    let location = useLocation();
    const { item } = location.state;


    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    

    const handleSubmit = async (e,fn) => {
        e.preventDefault()

        setisSubmitting(true)
    

        let response = await fetch('http://localhost:5000/api/v1/assign',{ 
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email:email, caseid: item._id})
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
        history.push('/app/dashboard/admincases')
    }
    const onHide = () => {
        history.push('/app/dashboard/admincases')
        setModalState('hide')
    }

    return (
        <div className={customStyles.donate}>
            <Card className={utilstyle.card} id={customStyles.payment} style={{maxWidth: "510px"}}>
                <CardHeader className={utilstyle.cardheader}>
                    <h5>Assign Counselor to {item.title} Case </h5>
                </CardHeader>
                <CardBody className={utilstyle.cardbody}>
                    {/* <div className={customStyles.icons}>
                        <img src={MasterCardIcon} alt="MASTERCARD ICON" />
                        <img src={VisaIcon} alt="VISA ICON" />
                    </div> */}
                    <Field 
                        label={"Counselor Email"} 
                        id={'email'} 
                        type={'text'} 
                        placeholder={'success@gmail.com'} 
                        fieldtype={'tt'} 
                        onChange={onChangeEmail} 
                        required={true} 
                        styles={styles} 
                        style={{ marginBottom:'20px'}}
                        disabled={false}
                    />
                </CardBody>
                <CardFooter className={utilstyle.cardfooter}>
                    <Button btntype="btn btn-clear" btntext={'Cancel'} onClick={() => cancel()} style={{width: "50%", marginRight:10}}/>
                    <Button btntype="btn" btntext={'Save'} onClick={handleSubmit} isSubmitting={isSubmitting} style={{width: "50%"}}/>
                </CardFooter>   
            </Card>
            <Modal status={modalstate} onHide={onHide} title='Message' handleSubmit={''} submitting={""} fns={[]}>
                { message }
            </Modal>
        </div>
    )
}


export default Assign;