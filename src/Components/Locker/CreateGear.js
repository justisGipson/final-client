import React, {Component} from 'react';
import Radium from 'radium';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import APIURL from '../../helpers/environment';

class CreateGear extends Component{
    constructor(props){
        super(props)
        this.state = {
            itemName: '',
            description: '',
            weight: '',
            quantity: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/locker`, {
            method: 'POST',
            body: JSON.stringify({gear: this.state}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.token
            })
        })
        .then(res => res.json())
        .then(gearData => {
            this.props.updateGearArray()
            this.setState({
                itemName: '',
                description: '',
                weight: '',
                quantity: ''
            })
        })
   }

   render(){
       return(
           <div>
               <h3>Create new locker items</h3>
               <hr />
               <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for='itemName'>Item Name:</Label>
                        <Input id='itemName' type='text' name='itemName' value={this.state.itemName} placeholder='Item Name' onChange={this.handleChange} />
                    </FormGroup>
               </Form>
           </div>
       )
   }
}

export default CreateGear;