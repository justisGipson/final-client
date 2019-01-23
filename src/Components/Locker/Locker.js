import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Gear from './Gear/Gear';

class LockerIndex extends React.Component{
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
        fetch("http://localhost:3000/locker/newItem", {
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
        fetch(`http://localhost:3000/locker/all/${event.target.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then(res => res.json())
        .then(gearData => {
            return this.setState({gear: gearData})
        })
    }

    gearUpdate = (event, gear) => {
        fetch(`http://localhost:3000/locker/update/${event.target.id}`, {
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
        fetch(`http://localhost:3000/removeItem/${event.target.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then(res => this.fetchGear())
    }

    render(){
        const gear = this.state.gear.length >= 1 ? <Gear gear={this.state.gear} delete = {this.gearDelete} update={this.setGearUpdate} /> : <h2>Start logging gear to display table.</h2>
        return(
            <Container>
                <Row>
                    <Col>
                    <h1>STUFF</h1>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LockerIndex;