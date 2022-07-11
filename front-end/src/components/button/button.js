import React from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './button.module.scss';
import { Spinner } from '../index';




const Button = (props) => {
    const { btntext, btntype, icon, isSubmitting } = props;

    return(
        <button className={styles[btntype]} {...props}>
        {/* <FontAwesomeIcon
            style={{ fontSize: "1.1rem", marginRight: ".3rem" }}
            icon={icon} />{" "} */}
            <span className={styles.icon}>{ icon }</span>
            {btntext}
            {isSubmitting ? <Spinner size={30}/> : <span className={styles.icon}></span>}
        </button>
    )
}

export default Button;