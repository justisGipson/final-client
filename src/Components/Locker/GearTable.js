import React from 'react';
import {Table, Button} from 'reactstrap';
// import ReactTable from 'react-table';
import Radium from 'radium';
// import _ from 'lodash';

const styles = {
    font: {
        fontFamily: "'Poppins', sans-serif",
        color: '#c1c6cc'
      },
    table: {
      backgroundColor: 'rgb(60, 82, 112, 0.9)',
      maxHeight: '90.5vh',
      overflow: 'scroll'
    },
    header: {
        position: 'fixed',
        zIndex: '1',
        height: '7vh',
        width: '35vw'
    }
}

const GearTable = (props) => {
    
    return(
        <div style={styles.table}>
            <h3 style={styles.header}><b>Your Gear Locker</b></h3>
            {/* <h3><small>Total weight:</small></h3> */}
            <br />
            <br />
            <Table hover maxHeight='97vh' style={[styles.font, styles.table]}>
                <thead style={styles.header}>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Weight</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {props.gear.map((gear, id) => {
                        return(
                            <tr key={id}>
                                <th scope="row" style={styles.font}>{gear.id}</th>
                                <td style={styles.font}>{gear.itemName}</td>
                                <td style={styles.font}>{gear.description}</td>
                                <td style={styles.font}>{gear.weight}</td>
                                <td style={styles.font}>{gear.quantity}</td>
                                <td>
                                    <Button className="btn btn-secondary" size="lg" style={styles.font} id={gear.id} onClick={e => props.update(e, gear)}>Update Locker</Button>
                                    <Button className="btn btn-secondary" size="lg" style={styles.font} id={gear.id} onClick={props.delete}>Delete Item</Button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>    
    );
}

export default Radium(GearTable);