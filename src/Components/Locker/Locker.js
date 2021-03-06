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
    }
}

class LockerIndex extends Component{
    constructor(props){
        super(props)
        this.state = {
            gear: [],
            updateStart: false,
            gearToUpdate: {},
        }
    }

    componentDidMount(){
        this.fetchGear()
    }

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
            return this.setState({gear: gearData.items})
        })
    }

    gearUpdate = (event, gear) => {
        fetch(`${APIURL}/locker/update/${gear.id}`, {
            method: 'PUT',
            body: JSON.stringify({gear: gear}),
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

    gearDelete = (event, item) => {
        fetch(`${APIURL}/locker/removeItem/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({gear: {item: event.target.id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
        .then(res => res.json())
        .then(gearData => {
            this.fetchGear()
        })
    }

    setGearUpdate = (event, gear) => {
        this.setState({
            gearToUpdate: gear,
            updateStart: true
        })
    }

    closeUpdate = () => {
        this.setState({
            updateStart: false
        })
    }

    render(){
        const gear = this.state.gear.length >= 0 ? <GearTable gear={this.state.gear} delete={this.gearDelete } update={this.setGearUpdate} /> : <div style={[styles.font, styles.box, styles.titlebar]}></div>
        return(
            <Container>
                <Row>
                    <Col sm='3'>
                        <CreateGear token={this.props.token} updateGearArray={this.fetchGear} /> 
                    </Col>
                    <Col sm='9'>
                        {gear}
                    </Col>
                </Row>
                <Col sm='12'>
                        {this.state.updateStart ? <LockerEdit true={this.state.updateStart} update={this.gearUpdate} gear={this.state.gearToUpdate} closeUpdate={this.closeUpdate}/> : <div></div>}
                </Col>
            </Container>
            
        )
    }
}

export default Radium(LockerIndex);