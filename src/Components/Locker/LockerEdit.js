import React, {Component} from 'react';
import Radium from 'radium';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const styles = {
    font: {
        fontFamily: "'Poppins', sans-serif",
        color: '#c1c6cc'
      },
      modal: {
        backgroundColor: '#3c5270',
        color: '#c1c6cc',
        fontFamily: "'Poppins', sans-serif",
        opacity: '.9',
        fontSize: '1.4rem',
        lineHeight: '1.7'
      },
      modalHead: {
        backgroundColor: '#3c5270',
        color: '#c1c6cc',
        fontFamily: "'Poppins', sans-serif",
        opacity: '.9',
        fontSize: '2.5rem'
      }
}

class LockerEdit extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            itemName: '',
            description: '',
            weight: '',
            quantity: '',
            isOpen: true
        }
    }

    componentDidMount(){
        this.setState({
            itemName: this.props.gear.itemName,
            description: this.props.gear.description,
            weight: this.props.gear.weight,
            quantity: this.props.gear.quantity
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.update(e, {
            id: this.props.gear.id,
            itemName: this.state.itemName,
            description: this.state.description,
            weight: this.state.weight,
            quantity: this.state.quantity

        })
    }

    toggle(){
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render(){
        return(
            <div>
                <Modal style={styles.modal} isOpen={this.props.true} toggle={this.toggle}>
                    <ModalHeader style={styles.modalHead}>Edit locker item</ModalHeader>
                    <ModalBody style={styles.modal}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup style={styles.font}>
                                <Label for='itemName'>Item Name:</Label>
                                <Input id='itemName' type='text' name='itemName' value={this.state.itemName} placeholder='New Item' onChange={this.handleChange} />
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
                        </Form>
                    </ModalBody>
                    <ModalFooter style={styles.modal}>
                        <Button className="btn btn-secondary" size="lg" style={styles.font} onClick={this.handleSubmit} type='submit'>Submit</Button>
                        <Button className="btn btn-secondary" size="lg" style={styles.font} onClick={this.props.closeUpdate} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Radium(LockerEdit);
