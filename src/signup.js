import React from 'react';
import './index.css';
import './signin';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';

class SignUp extends React.Component {
    
    constructor() {
        
        super();
        this.state = {
            email: '',
            password: '',
            confirm: '',
            checkbox: false,
            List:[]
        }

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateConfirm = this.updateConfirm.bind(this);
        this.updateCheckbox=this.updateCheckbox.bind(this);
    };

    updateEmail(e) {
        this.setState({email: e.target.value});
    }

    updatePassword(e) {
        this.setState({password: e.target.value});
    }

    updateConfirm(e) {
        this.setState({confirm: e.target.value});
    }

    updateCheckbox(e) {
        this.setState({checkbox: e.target.checked});
    }

    btnSignUp() {
        let hashpassword=CryptoJS.AES.encrypt(this.state.password, "Secret Key");
        axios.post('https://mystoganwebapi.herokuapp.com/api/admin', {
            email: this.state.email,
            password:  hashpassword.toString()
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setTimeout(()=>{
            this.props.history.push({
            pathname:'/signin',
            state:{
                emailSignUp:this.state.email
            }
        });//chuyển qua trang khác
        },2000);
    }

    componentWillMount() {
        var self=this;
        axios.get('https://mystoganwebapi.herokuapp.com/api/admin')
            .then(function (res) {
                self.setState({List:res.data});
            }).catch(function (err) {
            console.log(err);
        });
    }

    render() {

        let validEmail = '';
        let validPassword = '';
        let validConfirm = '';
        let commit = false;

        if(!checkEmail(this.state.List,this.state.email)) {
            validEmail='Email đã nhập bị trùng!';
        }

        if(this.state.password.length < 6) {
            validPassword='Mật khẩu ít nhất 6 kí tự!';
        }

        if(this.state.email.search('@') === -1) {
            validEmail='Email không hợp lệ';
        }

        if(this.state.password !== this.state.confirm) {
            validConfirm='Vui lòng nhập lại mật khẩu!';
        }

        if(validEmail === '' && validPassword === '' && validConfirm === '' && this.state.checkbox) {
            commit = true;
        }

        return(
            <div>
                <div className="header">BLOCKCHAIN</div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-md-offset-3">
                            <div className="panel panel-default">

                                <div className="panel-heading">
                                    <b className="title">Tạo ví mới</b> <Link to="/signin" className="signin">Đăng nhập</Link>
                                    <div className="subtitle"><i>Đăng kí ví miễn phí bên dưới</i></div>
                                </div>

                                <div className="panel-body">
                                    <div className="form-group">
                                        <label htmlFor="Inputemail">Email</label>
                                        <input type="text" className="form-control" id="Inputemail" value = {this.state.email}
                                               onChange = {this.updateEmail}/>
                                        <div className="status">{validEmail}</div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Inputpassword">Mật khẩu</label>
                                        <input type="password" className="form-control" id="Inputpassword" value = {this.state.password}
                                               onChange = {this.updatePassword}/>
                                        <div className="status">{validPassword}</div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Inputconfirmpassword">Xác nhận mật khẩu</label>
                                        <input type="password" className="form-control" id="Inputconfirmpassword" value = {this.state.confirm}
                                               onChange = {this.updateConfirm}/>
                                        <div className="status">{validConfirm}</div>
                                    </div>

                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" value={this.state.checkbox} onChange={this.updateCheckbox}/> 
                                            Tôi đã đọc và đồng ý với Điều khoản dịch vụ
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-lg btn-info btn-block" disabled={!commit} onClick={()=>this.btnSignUp()}>ĐĂNG KÝ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function checkEmail(listEmail,emailInput) {
    for(let i = 0; i < listEmail.length; i++){
        if(emailInput === listEmail[i].email){
            return false;
        }
    }
    return true;
}
export default SignUp