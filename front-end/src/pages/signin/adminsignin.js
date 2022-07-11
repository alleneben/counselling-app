import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Field, Button, Modal } from '../../components';
import styles from '../../asset/scss/forms.module.scss';
import customStyles from './signin.module.scss';
// import { ReactComponent as GoogleIcon } from '../../asset/icons/search.svg'; 
// import { ReactComponent as Logo } from '../../asset/img/logo.svg';



const AdminSignIn = () => {
    let history = useHistory()
    let location = useLocation()

    const [message, setMessage] = useState('')
    const [modalstate, setModalState] = useState('hide')
    const [isSubmitting, setisSubmitting] = useState(false)
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState(null)


    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setisSubmitting(true)

        let response = await fetch('http://localhost:5000/api/v1/login',{ 
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email:email, password: password})
        })
        response = await response.json()

        if (response.success) {
            localStorage.setItem('counseleeid', response.id)
            localStorage.setItem('role', response.role)
            if(response.role === 'Admin'){
                history.push({pathname:'/app/dashboard/admincases', state:response.id})
            } else {
                history.push({pathname:'/app/dashboard/counselorcases', state:response.id})
            }
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
                    label={'Email'} 
                    id={'email'} 
                    type={'email'} 
                    placeholder={'Enter your email address'} 
                    fieldtype={'tt'} 
                    onChange={onChangeEmail} 
                    required={true} 
                    styles={styles}
                    style={{marginBottom: '10px'}}
                    disabled={false}
                />
                <Field 
                    label={'Password'} 
                    id={'password'} 
                    type={'password'} 
                    placeholder={'**********'} 
                    fieldtype={'tt'} 
                    onChange={onChangePassword} 
                    required={true} 
                    styles={styles}
                    disabled={false}
                />
                <p id={customStyles.forgottenpassword}>Forgotten your password?</p>
                <Button btntype="btn" onClick={handleSubmit}  btntext={'Log In'} isSubmitting={isSubmitting}/>
                <br/>
            </div>
        </div>
    )
}

export default AdminSignIn;