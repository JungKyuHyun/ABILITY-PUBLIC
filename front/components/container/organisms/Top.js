import React , {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap'; // 리액스트랩 네비바
  import 'bootstrap/dist/css/bootstrap.css'; //리액트 부트스트랩 Css
import {NavLink} from 'react-router-dom';


/**
 * @auth 정진호
 * @summary 상단 네비바 컴포넌트 
 **/


export class Top extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      login: 0,
    };

  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
        
          <NavbarToggler onClick={this.toggle} />
          <img src = "/Image/Logo2.png" className="Logo-ABILITY" alt = "로고"/>
          <Collapse isOpen={this.state.isOpen} navbar>
          <NavbarBrand href="/">
            </NavbarBrand>
                <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to={"/question"} >질의 응답</NavLink>
                </NavItem>
                <NavItem>
                <NavLink to={"/test"}>개발자들</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink to="/jobopening">개발자 모집</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/project">Project 보기</NavLink>
              </NavItem>
              <NavItem>
              <NavLink to="/chat">#Chatting</NavLink>
              </NavItem>
              <NavItem>
              <NavLink to="/test">Test</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
          <hr/>
      </div>
    );
  }
}
