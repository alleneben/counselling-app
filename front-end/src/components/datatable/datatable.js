import React from 'react';
import { useHistory } from "react-router-dom";

import styles from './datatable.module.scss';


// let col=0;
const DataTable  = ({ config, data }) => {
    const history = useHistory();
    // useEffect(() => {
    //     let tbl = document.getElementById('loader')
    //     tbl.classList.add('spinner');
        
    //     setTimeout(() => {
    //         tbl.classList.remove('spinner');

    //     }, 5000) 
    // },[])

    const image = (name) => {
        // let img = !!name ? api.fxns.endpoint+'/img/'+name : api.fxns.endpoint+'/img/vt.jpeg';
        // return <div className={styles.imgcontainer}>
        //     <div className={styles.imgwrapper}>
        //         <img src={img} alt="sample.png" className={styles.img}/>
        //     </div>
        // </div>
    }
    const trigger = (path,item) => {
        history.push({
            pathname: path,
            state: { item: item },
          });
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.tablewrapper}>
                    <h3>{ config.name }</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {
                                    config.header.map((d,k) => {
                                        return (
                                        <th key={k} className={styles.th}>
                                        { d }
                                        </th>
                                        )
                                    })
                                }
                                {config.actions.length > 0 ? <th className={styles.th}>Actions</th> : ''}
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {
                                data.map((item,key) => {
                    
                                    return (
                                      <tr key={key} className={styles.tr}>
                                          {/* <td data-column={config.header[0]} className={styles.td}>{key+1}</td> */}
                                          {
                                              config.fieldnames.map((dd,kk) => {
                                                  var val = dd.f === 'd' ? parseFloat(item[dd.n]).toFixed(2) : dd.f === 'i' ? image(item[dd.n]) : item[dd.n];

                                                //   col = kk + 1
                                                  return (
                                                      <td key={kk} data-column={config.header[kk+1]} className={styles.td}>
                                                          <div className={styles.tdmain}>{val}</div>
                                                          {/* <div className={styles.tdsub}>{val}</div> */}
                                                      </td>
                                                  )
                                              })
                                          }
                                          {/* <td className={styles.td} data-column={config.header[col+1]}>
                                              { config.status.map((s,sk)=> <span key={sk} className={styles.active}>{s}</span>) }
                                          </td> */}
                                          <td className={styles.td}>
                                              { config.actions.map((action,actionkey) => <span key={actionkey} className={styles.action} onClick={() => trigger(action.path,item)}>{action.fn}</span>)}
                                          </td>
                                      </tr>
                                    );
                                  })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    )
}

export default DataTable;