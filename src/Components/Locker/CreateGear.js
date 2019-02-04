import React, {Component} from 'react';
import Radium from 'radium';
import {Button, Form, FormGroup, /*CustomInput,*/ Label, Input} from 'reactstrap';
import APIURL from '../../helpers/environment';

const styles = {
    font: {
        fontFamily: "'Poppins', sans-serif",
        color: '#c1c6cc',
        paddingTop: '.5rem'
      },
    box: {
        backgroundColor: 'rgb(60, 82, 112, 0.9)',
        marginTop: '30%',
        height: '45vh',
        boxShadow: '.3rem .3rem hsl(223, 12%, 12%, 60%)',
        borderRadius: '.5em'
    },
    form: {
        paddingLeft: '.5rem',
        paddingRight: '.5rem'
    },
    formGroup: {
        textAlign: 'left',
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
       return(
           <div style={styles.box}>
               <h3 style={styles.font}>Create new locker items</h3>
               <hr />
               <Form style={styles.form} onSubmit={this.handleSubmit}>
                    <FormGroup style={styles.font}>
                        <Label for='itemName'>Item Name:</Label>
                        <Input id='itemName' type='text' name='itemName' value={this.state.itemName} placeholder='Item Name' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup style={styles.font}>
                        <Label for='description'>Description:</Label>
                        <Input id='description' type='textarea' name='description' value={this.state.description} placeholder='Description' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup style={styles.font}>
                        <Label for='weight'>Weight:</Label>
                        <Input id='weight' type='text' name='weight' value={this.state.weight} placeholder='Item Weight' onChange={this.handleChange} />
                            {/* <CustomInput type="select" id="weightSelect" name="weightSelect">
                                <option value={this.state.weight}></option>
                                <option>g</option>
                                <option>Oz</option>
                                <option>Lbs</option>
                                <option>Kg</option>
                            </CustomInput> */}
                    </FormGroup>
                    <FormGroup style={styles.font}>
                        <Label for='quantity'>Quantity:</Label>
                        <Input id='quantity' type='integer' name='quantity' value={this.state.quantity} placeholder='Quantity' onChange={this.handleChange} />
                    </FormGroup>
                    <br />
                    <hr />
                    <div>
                    <Button className="btn btn-secondary" size="lg" style={styles.font} type='submit'>Submit</Button>
                    {/* <Button className="btn btn-secondary" size="lg" style={styles.font} type='reset'>Reset</Button> */}
                    </div>
               </Form>
           </div>
       )
   }
}

export default Radium(CreateGear);