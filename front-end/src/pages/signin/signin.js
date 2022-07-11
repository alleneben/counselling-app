import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Field, Button, Modal } from '../../components';
import styles from '../../asset/scss/forms.module.scss';
import customStyles from './signin.module.scss';
// import { ReactComponent as GoogleIcon } from '../../asset/icons/search.svg'; 
// import { ReactComponent as Logo } from '../../asset/img/logo.svg';



const SignIn = () => {
    let history = useHistory()
    let location = useLocation()

    const [message, setMessage] = useState('')
    const [modalstate, setModalState] = useState('hide')
    const [isSubmitting, setisSubmitting] = useState(false)
    const [ password, setPassword ] = useState(location.state ? location.state : null)

    const goToSignUp = () => {
        history.push('/signup')
    }

    const onChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e,fn) => {
        e.preventDefault()

        setisSubmitting(true)

        let response = await fetch('http://localhost:5000/api/v1/counseleesignin',{ 
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({password: password})
        })
        response = await response.json()

        if (response.success) {
            console.log(response)
            localStorage.setItem('counseleeid', response.id)
            localStorage.setItem('role', response.role)
            history.push({pathname:'/app/dashboard/cases', state:response.id})
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

    return(
        <div className={customStyles.signin}>
            {/* <Logo /> */}
            <h2>Counselling App</h2>
            <div className={customStyles.form}> 
                <Field 
                label={'User Secret'} 
                id={'uid'} 
                type={'text'} 
                placeholder={'Enter your user secret'} 
                fieldtype={'tt'} 
                onChange={onChange} 
                required={true} 
                styles={styles}
                style={{marginBottom: '20px'}}
                disabled={false}
                value={password}
                />
                
                <p id={customStyles.forgottenpassword}>Forgotten your secret?</p>
                <Button btntype="btn" onClick={handleSubmit}  btntext={'Log In'} isSubmitting={isSubmitting}/>
                <br/>
                {/* <Button btntype="btn-clear" btntext={'Log in with Google'} icon={<GoogleIcon/>}/> */}
                <p id={customStyles.createone}>Don't have a secret? <span onClick={goToSignUp}>CREATE ONE</span></p>
                <Modal status={modalstate} onHide={onHide} title='Message' handleSubmit={''} submitting={""} fns={[]}>
                    { message.split('::')[0] } <h3>{ message.split('::')[1] }</h3>
                </Modal>
            </div>
            
        </div>
    )
}

export default SignIn;