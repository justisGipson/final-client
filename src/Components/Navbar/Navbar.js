import React, {Component} from 'react';
import Radium from 'radium';
import Auth from '../Auth/Auth';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter
    } from 'reactstrap';

const styles = {
    navbar: {
        backgroundColor: '#3c5270',
        fontFamily: "'Poppins', sans-serif",
        opacity: '.9',
        height: '7vh',
    },
    text: {
        color: '#c1c6cc',
        textDecoration: 'none',
        display: 'flex-inline',
        fontSize: '1.6rem'
    },
    text1: {
      color: '#c1c6cc',
      fontSize: '2.9rem',
      fontWeight: 'bold'
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

class Sitebar extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        }, console.log(this.state));
      }

      toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      logout = () => {
        this.setState({sessionToken: ''});
        localStorage.clear()
      }

      render() {
        return (
          <div style={styles.navbar}>
            <Navbar expand="md">
              <NavbarBrand style={styles.text1}>gearLocker</NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav style={styles.text} className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href='#' onClick={this.toggle} style={styles.text}>About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="./auth" style={styles.text} onClick={this.logout} >Logout</NavLink>{Auth}
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/justisGipson" style={styles.text}>Github</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>

            <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className} style={styles.modal}>
                <ModalHeader style={styles.modalHead}>About gearLocker</ModalHeader>
                  <ModalBody style={styles.modal}>
                      {/* <b>gearLocker is designed for tracking your gear for backpacking trip, overnighters, and those long weekends.</b><br /> */}
                      Hopefully you can find some use out of this. Keep track of all your gear or just the things you plan on taking on any trip. This app will be in constant development, and will hopefully be mobile responsive so you can keep it bookmarked on your phone to use when you're not at your computer.
                    </ModalBody>
                  <ModalFooter style={styles.modal}>
                      <Button color='info' onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
              </Modal>
          </div>
        );
      }
}

export default Radium(Sitebar);