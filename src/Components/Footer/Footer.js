import React, {Component} from 'react';
import Radium from 'radium';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {Form, Input, /*Button, FormText,*/ Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import Button from '@material-ui/core/Button';

const envelope = <FontAwesomeIcon icon={faEnvelope} size='lg' />

const styles = {
    footer: {
        backgroundColor: '#3c5270',
        color: '#c1c6cc',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.5em',
        opacity: '.9',
        height: '4vh',
        width: '100vw',
        marginBottom: '-.5vh',
        textAlign: 'center'
    },
    a: {
        color: '#c1c6cc',
        ':hover':{
            color: '#c1c6cc',
            textDecoration: 'none',
        }
    },
    modal: {
        color: '#c1c6cc',
        fontFamily: "'Poppins', sans-serif",
        opacity: '.9',
        fontSize: '1.4rem',
        lineHeight: '1.7',
        maxWidth: '30vw'
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
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle(){
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render(){
        return(
            <div className='fixed-bottom'>
                <h3 style={styles.footer}>Created by <a style={styles.a} href="https://justisgipson.com" target="blank">justisGipson</a> -- 2019  <Button className="btn" size="large" onClick={this.toggle}>{envelope}</Button></h3>
                <div>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle} centered={true} style={styles.modal}>
                    <ModalHeader style={styles.modalHead}>Contact for bugs you find, issues you have, or just to say it's rad.</ModalHeader>
                    <Form action="https://formspree.io/justis710@gmail.com"
                            method="POST" target="blank">
                        <ModalBody style={styles.modalBody}>
                            
                                <Input type="email" name="email" placeholder="Email:" required/>
                                <br />
                                <Input type="textarea" name="message" placeholder="Enter your message:" />
                            
                        </ModalBody>
                    <ModalFooter style={styles.modalBody}>
                        <Button className="btn btn-secondary" size="sm" type="submit" value="send">Submit</Button>
                        <Button className='btn btn-secondary' size='sm' onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
                </div>
            </div>
        )
    }
}

export default Radium(Footer);
