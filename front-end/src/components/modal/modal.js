import React from 'react';

import styles from './modal.module.scss';
import { Button } from '../button';



const Modal = (props) => {

    const { status, onHide, children, title,handleSubmit,fns } = props

    const handlemousedown = (e,fn) => {
        if(fn === undefined) return onHide();
        

        handleSubmit(e,fn)
        // onhide(fn)
        e.stopPropagation(); 
       
    }

    return(
        
            <div  className={`${styles.overlaycontainer} ${styles[status]}`}>
                <div className={`${styles.content} ${styles[status]}` }>
                    <div className={styles.header}>
                        {/* <div> */}
                            <h4 className={styles.title}>
                             { title }
                            </h4>
                            <span className={styles.lead}></span>
                        {/* </div> */}
                        <span onClick={handlemousedown} className={styles.close} onMouseDown={handlemousedown}>
                            &times;
                        </span>
                    </div>
                    <div className={styles.modalbody}>
                        { children }
                    </div>
                    <div className={styles.footer}>
                        {
                            fns.map((fn,key) => <Button key={key} btntype="btn" btntext={fn} onClick={(e) => handlemousedown(e,fn)}/>)
                        }
                        
                        {/* <button className={formstyles.button} onClick={handleSubmit} disabled={submitting}>Submit</button> */}
                    </div>
                </div>
            </div>
        
    )
}

export default Modal;