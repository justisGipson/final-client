import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

export default class LockerEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemName: '',
            description: '',
            weight: '',
            quantity: ''
        };
    }

    componentWillMount(){
        this.setState({
            itemName: this.props.locker.itemName,
            description: this.props.locker.description,
            weight: this.props.locker.weight,
            quantity: this.props.locker.quantity
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }

    render(){
        return(
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>Create a new locker item:</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for='itemName'>Item Name:</Label>
                                <Input id='itemName' type='text' name='itemName' value={this.state.itemName} placeholder='New Item' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='desc'>Description:</Label>
                                <Input id='desc' type='text' name='desc' value={this.state.description} placeholder='Description' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='weight'>Weight:</Label>
                                <Input id='weight' type='text' name='weight' value={this.state.weight} placeholder='Item Weight' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='quantity'>Quantity:</Label>
                                <Input id='quantity' type='integer' name='quantity' value={this.state.quantity} placeholder='Quantity' onChange={this.handleChange} />
                            </FormGroup>
                            <Button type='submit' color='secondary'>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}