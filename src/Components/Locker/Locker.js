import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Radium from 'radium';
import CreateGear from './CreateGear';
import GearTable from './GearTable';
import LockerEdit from './LockerEdit';
import APIURL from '../../helpers/environment';

const styles = {
    font: {
        fontFamily: "'Poppins', sans-serif",
        color: '#c1c6cc'
      },
    titlebar: {
        fontSize: '3rem'
    },
    box: {
        backgroundColor: 'rgb(60, 82, 112, 0.9)',
        marginTop: '10.5vh'
    }
}

class LockerIndex extends Component{
    constructor(props){
        super(props)
        this.state = {
            gear: [],
            updateStart: false,
            gearToUpdate: {}
        }
    }

    componentDidMount(){
        this.fetchGear()
    }

    // addGear = () => {
    //     fetch(`${APIURL}/locker/newItem`, {
    //         method: 'POST',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('token')
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(newGear => {
    //         return this.setState({gear: newGear})
    //     })
    // }

    fetchGear = () => {
        fetch(`${APIURL}/locker/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
        .then(res => res.json())
        .then(gearData => {
            console.log(gearData)
            return this.setState({gear: gearData})
        })
    }

    gearUpdate = (event, gear) => {
        fetch(`${APIURL}/locker/update/${gear.id}`, {
            method: 'PUT',
            body: JSON.stringify({data: gear}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
        .then(res => {
            this.setState({updateStart: false})
            this.fetchGear();
        })
    }

    gearDelete = (event) => {
        fetch(`${APIURL}/removeItem/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({data: {id: event.target.id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
        .then(res => this.fetchGear())
    }

    setGearUpdate = (event, gear) => {
        this.setState({
            gearToUpdate: gear,
            updateStart: true
        })
    }

    render(){
        const gear = this.state.gear.length >= 1 ? <GearTable gear={this.state.gear} delete={this.gearDelete} update={this.setGearUpdate} /> : <h2 style={[styles.font, styles.box, styles.titlebar]}>Your Gear Locker</h2>
        console.log("test")
        return(
            <Container>
                <Row>
                    <Col md='3'>
                        <CreateGear token={this.props.token} updateGearArray={this.fetchGear} /> 
                    </Col>
                    <Col md='9'>
                        {gear} {console.log('table')}
                    </Col>
                </Row>
                <Col md='12'>
                        {this.state.updateStart ? <LockerEdit true={this.state.updateStart} update={this.gearUpdate} gear={this.state.gearToUpdate} /> : <div></div>}
                </Col>
            </Container>
            
        )
    }
}

export default Radium(LockerIndex);