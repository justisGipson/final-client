import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import GearTable from './GearTable';
import LockerEdit from './LockerEdit';
import CreateGear from './CreateGear';
import APIURL from '../../helpers/environment'

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

    addGear = () => {
        fetch(`${APIURL}/locker/newItem`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then(res => res.json())
        .then(newGear => {
            return this.setState({gear: newGear})
        })
    }

    fetchGear = (event) => {
        fetch(`${APIURL}/locker/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then(res => res.json())
        .then(gearData => {
            return this.setState({gear: gearData})
        })
    }

    gearUpdate = (event, gear) => {
        fetch(`${APIURL}/locker/update/${event.target.id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then(res => {
            this.setState({updateStart: false})
            this.fetchGear();
        })
    }

    setGearUpdate = (event, gear) => {
        this.setState({
            gearToUpdate: gear,
            updateStart: true
        })
    }

    gearDelete = (event) => {
        fetch(`${APIURL}/removeItem/${event.target.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then(res => this.fetchGear())
    }

    render(){
        const gear = this.state.gear.length >= 1 ? <GearTable gear={this.state.gear} delete={this.gearDelete} update={this.setGearUpdate} /> : <h2>Start logging gear to display table.</h2>
        return(
            <Container>
                <Row>
                    <Col md='3'>
                        <CreateGear token={this.props.token} updateGearArray={this.fetchGear} /> 
                    </Col>
                    <Col md='9'>
                        {gear}
                    </Col>
                </Row>
                <Col md='12'>
                        {this.state.updateStart ? <LockerEdit t={this.state.updateStart} update={this.gearUpdate} gear={this.state.gearToUpdate} /> : <div></div>}
                </Col>
            </Container>
        )
    }
}

export default LockerIndex;