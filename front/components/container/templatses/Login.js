import React,{Component} from 'react';
import axios from 'axios';

import {b1Css,b2Css,btnCss,containerCss,h1Css,tboxCss,tboxInputCss} from './css/LoginCss';

/**
 * @author 정규현
 * @summary 비동기 rest 로그인 
 * @version 정규현 리덕스 추가 
 */

const backUrl = process.env.NODE_ENV === 'production'? "?/user/login" : "?/user/login";

class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            inputEmail:'',
            inputPassword:'',
            errors:'',
            isLoding: false
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    
    handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(backUrl,
      {
          email:this.state.inputEmail,
          password:this.state.inputPassword
      })
        .then(res => {
          this.setState({
            inputEmail:'',
            inputPassword:'',
            isLoding:false,
        });

        localStorage.setItem("userid",this.state.user.userid);
        localStorage.setItem("email",this.state.user.email);
        localStorage.setItem("nick_name",this.state.user.nick_name);
        localStorage.setItem("user_image",this.state.user.user_image);
        localStorage.setItem("reputation",this.state.user.reputation);
        localStorage.setItem("role_name",this.state.user.role_name);
        localStorage.setItem("token",this.state.token);
        this.props.history.push('/');
        
        })
        .catch(res => {
            console.log(res)
            this.setState({
                errors:"로그인 정보를 다시 확인해 주세요",
                isLoding:false,
            })
        });
    };
  
    render() {
      return (
          <>
        <div className='container' style={containerCss}>
        <h1 style={h1Css}><b>ABILITY</b></h1>
            <form>
                <div className="tbox" style={tboxCss}>
                    <input style={tboxInputCss} type="text" id="login-email" name="inputEmail" maxLength="100" placeholder="Email" value={this.state.inputEmail} onChange={this.handleChange}/> 
                </div>
                <div className="tbox" style={tboxCss}>
                    <input type="password" style={tboxInputCss} id="login-password" name="inputPassword" maxLength="20" placeholder="password" value={this.state.inputPassword} onChange={this.handleChange} /> 
                </div>
                    <span style={{color:'red',fontWeight:"bold"}} id='a-login-submit'>{this.state.errors}</span>

                    <input className="btn" style={btnCss} id="a-login-submit-btn" type="submit" name="button" value="LOG IN" onClick={this.handleSubmit} disabled={this.state.isLoding}/>
            </form>
            <a className="b1" style={b1Css} href="/ability3/signup">회원가입</a>
            <a className="b2" style={b2Css} href="/ability3/login/forgot">Forgot Password?</a>
        </div>
            </>
      );
    }
  }

export default Login;