import React, {Component} from 'react';
import Radium from 'radium';
import {Form, Input, Button, Label, FormText, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const styles = {
    footer: {
        backgroundColor: '#3c5270',
        color: '#c1c6cc',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.5em',
        opacity: '.7',
        height: '3vh',
        marginTop: '39vh'
    },
    modal: {
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
      },
      modalBody: {
        backgroundColor: '#3c5270',
      }
}

class Footer extends Component{
    constructor(props){
        super(props);
        this.toggle = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

      toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render(){
        return(
            <div>
                <h3 style={styles.footer}>Created by justisGipson 2019                 <Button className="btn btn-outline-secondary" size="sm" onClick={this.toggle}>Contact</Button></h3>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle} centered={true}>
                    <ModalHeader style={styles.modalHead}>Contact</ModalHeader>
                        <ModalBody style={styles.modalBody}>
                            <Form method="POST" action="https://formspree.io/justis710@gmail.com">
                                <Input type="email" name="email" placeholder="Email:" />
                                <FormText name="message" placeholder="Enter your message:"></FormText>
                            </Form>
                        </ModalBody>
                    <ModalFooter style={styles.modalBody}>
                        <Button className="btn btn-secondary" type="submit" value="send" onClick={this.toggle}>Submit</Button>
                        <Button className='btn btn-secondary' size='lg' onclick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Radium(Footer);