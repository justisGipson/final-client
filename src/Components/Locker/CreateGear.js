import React, {Component} from 'react';
import Radium from 'radium';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import APIURL from '../../helpers/environment';

const styles = {
    font: {
        fontFamily: "'Poppins', sans-serif",
        color: '#c1c6cc'
      },
    box: {
      backgroundColor: 'rgb(60, 82, 112, 0.9)',
      marginTop: '30%',
      marginLeft: '-10vw',
      height: '45vh'
    }
}

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
        // console.log(this.state)
        event.preventDefault();
        fetch(`${APIURL}/locker/newItem`, {
            method: 'POST',
            body: JSON.stringify({gear: this.state}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
        .then(res => res.json())
        .then(gearData => {
            this.props.updateGearArray()
            this.setState({
                itemName: gearData.itemName,
                description: gearData.description,
                weight: gearData.weight,
                quantity: gearData.quantity
            })
        })
   }

   render(){
       console.log(this.state)
       return(
           <div style={styles.box}>
               <h3 style={styles.font}>Create new locker items</h3>
               <hr />
               <Form onSubmit={this.handleSubmit}>
                    <FormGroup style={styles.font}>
                        <Label for='itemName'>Item Name:</Label>
                        <Input id='itemName' type='text' name='itemName' value={this.state.itemName} placeholder='Item Name' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup style={styles.font}>
                        <Label for='description'>Description:</Label>
                        <Input id='description' type='text' name='description' value={this.state.description} placeholder='Description' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup style={styles.font}>
                        <Label for='weight'>Weight:</Label>
                        <Input id='weight' type='text' name='weight' value={this.state.weight} placeholder='Item Weight' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup style={styles.font}>
                        <Label for='quantity'>Quantity:</Label>
                        <Input id='quantity' type='integer' name='quantity' value={this.state.quantity} placeholder='Quantity' onChange={this.handleChange} />
                    </FormGroup>
                    <br />
                    <br />
                    <hr />
                    <Button className="btn btn-secondary" size="lg" style={styles.font} type='submit'>Submit</Button>
               </Form>
           </div>
       )
   }
}

export default Radium(CreateGear);