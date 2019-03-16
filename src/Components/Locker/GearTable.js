import React from 'react';
import Radium from 'radium';
import {Table, /*Button*/} from 'reactstrap';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons';

const styles = {
    font: {
        fontFamily: "'Poppins', sans-serif",
        color: '#c1c6cc'
    },
    table: {
      backgroundColor: 'rgb(60, 82, 112)',
      maxHeight: '90.5vh',
      overflow: 'scroll',
      opacity: '0.9'
    },
    header: {
        position: 'fixed',
        height: '7vh',
        overflow: 'hidden'
    }
}

const GearTable = (props) => {
    return(
        <div style={styles.table} >
            <h3 className="fixed-header"><b>Your Gear Locker</b></h3>
            {/* <h3><small>Total weight:{}</small></h3> */}
            <br />
            <br />
            <Table hover style={styles.table}>
                <thead style={styles.font}>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Weight</th>
                        <th>Quantity</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.gear.map((gear, id) => {
                        return(
                            <tr key={id} style={styles.font}>
                                <th scope='row'>{gear.id}</th>
                                <td>{gear.itemName}</td>
                                <td>{gear.description}</td>
                                <td>{gear.weight}</td>
                                <td>{gear.quantity}</td>
                                <td>
                                    <Button className="btn btn-secondary" size="lg" id={gear.id} onClick={e => props.update(e, gear)}><FontAwesomeIcon icon={faEdit} size='lg' /></Button>
                                </td>
                                <td>
                                    <Button className="btn btn-secondary" size="lg" id={gear.id} onClick={props.delete}><FontAwesomeIcon icon={faTrashAlt} size='lg' /></Button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <div>
            
            </div>
        </div>
    );
}

export default Radium(GearTable);