import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from '../../components';
import customStyles from './signup.module.scss';


const SignUp = () => {
    let history = useHistory()
    const [message, setMessage] = useState('')
    const [modalstate, setModalState] = useState('hide')
    const [isSubmitting, setisSubmitting] = useState(false)


    const goToSignIn = () => {
        history.push('/')
    }
    
    const handleSubmit = async (e,fn) => {
        e.preventDefault()

        setisSubmitting(true)

        let response = await fetch('http://localhost:5000/api/v1/counseleesignup',{method:'POST',body:{}})
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
    const onHide = () => {
        setModalState('hide')
    }
    const navigate = (e,fn) => {
        if(fn !== 'submit') return history.push({pathname:'/', state:(message.split('::')[1]).trim()})
    }

    return(
        <div className={customStyles.signup}>
            {/* <Logo /> */}
            <h2>Counselling App</h2>
            <div className={customStyles.form}> 
                {/* <Field 
                    label={'Email'} 
                    id={'email'} 
                    type={'text'} 
                    placeholder={'Enter your email'} 
                    fieldtype={'tt'} 
                    onChange={onChange}
                    required={true} 
                    styles={styles} 
                    style={{marginBottom: '10px', height: 50}}
                    disabled={false}
                />
                <Field 
                    label={'Password'} 
                    id={'password'} 
                    type={'password'} 
                    placeholder={'**********'} 
                    fieldtype={'tt'} 
                    onChange={onChange} 
                    required={true} 
                    styles={styles} 
                    style={{marginBottom: '10px', height: 50}}
                    disabled={false}
                />
                <Field 
                    label={'Repeat Password'} 
                    id={'repeatpassword'} 
                    type={'repeatpassword'} 
                    placeholder={'**********'} 
                    fieldtype={'tt'} 
                    onChange={onChange}  
                    required={true} 
                    styles={styles} 
                    style={{marginBottom: '10px', height: 50}}
                    disabled={false}
                /> */} 

                <Button btntype="btn" btntext={'Get Started'} onClick={handleSubmit} isSubmitting={isSubmitting}/>
                <br/>
                {/* <Button btntype="btn-clear" btntext={'Signup with Google'} icon={<GoogleIcon/>}/> */}
                <p id={customStyles.login}>Already have an account? <span onClick={goToSignIn}>LOG IN</span></p>
                <Modal status={modalstate} onHide={onHide} title='Message' handleSubmit={navigate} submitting={""} fns={['Procced to login']}>
                    { message.split('::')[0] } <h3>{ message.split('::')[1] }</h3>
                </Modal>
            </div>
        </div>
    )
}

export default SignUp;