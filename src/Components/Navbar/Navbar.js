import React, {Component} from 'react';
import Radium from 'radium';
// import Auth from '../Auth/Auth';
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
        });
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
                    <NavLink href="./auth" style={styles.text} onClick={this.logout}>Logout</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/justisGipson/final-client" style={styles.text} target="blank">Github</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            <div>
            <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className} style={styles.modal} centered={true}>
                <ModalHeader style={styles.modalHead}>About gearLocker</ModalHeader>
                <ModalBody style={styles.modalBody}>
                    Hopefully you can find some use out of this. Keep track of all your gear or just the things you plan on taking on any trip. This app will be in constant development, and will hopefully become more mobile responsive so you can keep it bookmarked on your phone to use when you're not at your computer. Please feel free to use the contact form down in the footer to contact me or follow the link to my Github for pull requests.
                </ModalBody>
                <ModalFooter style={styles.modalBody}>
                    <Button className="btn btn-secondary" size="lg" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
          </div>
        );
      }
}

export default Radium(Sitebar);