import React, {Component} from 'react';
import Radium from 'radium';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';



class AboutModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    
    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }

    render(){
        const externalClose = <button className='close' style={{position: 'absolute', top: '15px', right: '15px'}} onClick={this.toggle}>&times;</button>;
        return(
            <div>
                <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalClose}>
                    <ModalHeader>About this app</ModalHeader>
                    <ModalBody>
                        <b>This app is designed for tracking your gear for backpacking trip, overnighters, and those long weekends.</b><br />
                        Hopefully you can find some use out of this. Keep track of all your gear or just the things you plan on taking on any trip. This app will be in constant development, and will hopefully be mobile responsive so you can keep it bookmarked on your phone to use when you're not at your computer.
                    </ModalBody>
                    <ModalFooter>
                        <Button color='info' onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Radium(AboutModal);