import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardRoutes from '../../routes/dashboard-routes';
import { faUser, faBell, faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { SideNav } from '../../components';
import styles from './dashboard-layout.module.scss';


const DashboardLayout = (props) => {
    // const [title,setTitle] = useState('Welcome Jones')
    let location = useLocation()
    
    const toggleSidebar = () => {
        let btn = document.querySelector("#menubtn_2")
        if(btn.classList.contains('active')){
            // btn_2.style.display = "block"
        }else{
            btn.classList.toggle('active')
        }

        let sidebar = document.querySelector(".sidebar")
        sidebar.classList.toggle('active')

        sidebar.style.display = "block"
        btn.style.display = "none"
    }

    return(
        <div className={styles.container}>
            <SideNav/>
            <nav className={"navbar"}>
                <i className='bx bx-menu' id="menubtn_2" onClick={toggleSidebar}></i>
                <h1>{`Welcome`}</h1>
                <div className={"navbar-right"}>
                    <FontAwesomeIcon style={{ fontSize: "1rem", color: "#cbd5e0", marginRight: "1rem"}} icon={faSearch}/>
                    <FontAwesomeIcon style={{ fontSize: "1rem", color: "#cbd5e0", marginRight: "1rem"}} icon={faBell}/>
                    <div className={styles.vertical}></div>
                    <h1></h1>
                    <div className={styles.dropdown}>
                        <button className={styles.dropbtn}>
                            <FontAwesomeIcon style={{ fontSize: "1.5rem"}} icon={faUser} />{" "}
                        </button>
                    </div>
                </div>
            </nav>
            <main className={"main"}>
                <DashboardRoutes />
            </main>
        </div>
    )

}

export default DashboardLayout;