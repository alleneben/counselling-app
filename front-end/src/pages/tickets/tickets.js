import { DataTable, Button } from '../../components';
import customStyles from './tickets.module.scss';

const Tickets = () => {

    const initConfig={
        name:'All tickets',
        header: ['Ticket ID', 'Ticket price', 'Purchase Date', 'Due Date'],
        fieldnames:[{n:'ticketID',f:'t'},{n:'ticketPrice',f:'t'},{n:'purchasedate',f:'t'},{n:'duedate',f:'t'}],
    }

    const data = [
        {'ticketID':1873999, 'ticketPrice': '$23.00', 'purchasedate':'20-12-2020', 'duedate':'12-12-2021'},
        {'ticketID':7489391, 'ticketPrice': '$23.00', 'purchasedate':'20-12-2020', 'duedate':'12-12-2021'},
        {'ticketID':3462781, 'ticketPrice': '$23.00', 'purchasedate':'20-12-2020', 'duedate':'12-12-2021'},
        {'ticketID':9372781, 'ticketPrice': '$23.00', 'purchasedate':'20-12-2020', 'duedate':'12-12-2021'}
    ]


    return (
        <div className={customStyles.tickets}>
            <Button btntype="btn" btntext={'Buy Ticket'} style={{width: '150px', marginLeft:'auto', marginBottom: '20px'}}/>
            <DataTable config={initConfig} data={ data } />
        </div>
    )
}


export default Tickets;