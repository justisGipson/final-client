import React, {Component} from 'react';
import Radium from 'radium';
import AboutModal from '../Modals/About';
import {
    Collapse,
    Navbar,
    // NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    } from 'reactstrap';

const styles = {
    navbar: {
        backgroundColor: '#3c5270',
        fontFamily: "'Poppins', sans-serif",
        opacity: '.9',
        height: '8vh'
    },
    text: {
        color: '#c1c6cc',
        marginLeft: '75%',
        textDecoration: 'none',
        marginTop: '-17px'
    },
    text1: {
      color: '#c1c6cc',
      fontSize: '14pt',
      marginLeft: '-90%',
      marginTop: '-10vh'
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

      render() {
        return (
          <div style={styles.navbar}>
            <Navbar expand="md">
              <NavbarBrand style={styles.text1}>gearLocker</NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav style={styles.text} className="ml-auto" navbar>
                  <NavItem>
                    <NavLink link={AboutModal} style={styles.text}>About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="../components/navbar/logout/logout" style={styles.text}>Logout</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/justisGipson" style={styles.text}>Github</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
}

export default Radium(Sitebar);