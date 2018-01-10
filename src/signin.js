import React from 'react';
import './index.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CryptoJS from 'crypto-js';

class SignIn extends React.Component {
    constructor() {

        super();
        this.state = {
            email: '',
            password:'',
            List:[]
        } 

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    };

    updateEmail(e) {
        this.setState({email: e.target.value});
    }

    updatePassword(e) {
        this.setState({password: e.target.value});
    }

    btnSignIn(){
        if(checkUser(this.state.List,this.state.email,this.state.password)) {
            this.props.history.push({
                pathname:'/dashboard',
                state:{
                    IDvi:this.state.email
                }
            });//chuyển qua trang khác
        }
        else{
            alert("Sai ID hoặc password!");
        }
    }

    componentWillMount(){
        var self=this;
        axios.get('https://mystoganwebapi.herokuapp.com/api/admin')
            .then(function (res) {
                self.setState({List:res.data});
                for(let i = 0; i < res.data.length; i++)
                {
                    if(self.props.location.state.emailSignUp === res.data[i].email)
                    {
                        self.setState({email:res.data[i]._id,password:CryptoJS.AES.decrypt(res.data[i].password, "Secret Key").toString(CryptoJS.enc.Utf8)});
                    }
                }
            }).catch(function (err) {
            console.log(err);

        });
    }

    render(){

        return(
            <div>
                <div className="header">BLOCKCHAIN</div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-md-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <b className="title">Đăng nhập!</b> <Link to="/signup" className="signup">Đăng kí</Link>
                                    <div className="subtitle"><i>Đăng nhập vào ví của bạn bên dưới</i></div>
                                </div>

                                <div className="panel-body">
                                    <div className="form-group">
                                        <label htmlFor="Inputwallet">ID</label>
                                        <input type="text" className="form-control" id="Inputwallet" value = {this.state.email}
                                               onChange = {this.updateEmail} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Inputpassword">Mật khẩu</label>
                                        <input type="password" className="form-control" id="Inputpassword" value = {this.state.password}
                                               onChange = {this.updatePassword}/>
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" className="btn btn-lg btn-info btn-block" value="ĐĂNG NHẬP" onClick={()=>this.btnSignIn()}/>
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

function checkUser(List,Id,password) {
    for(let i = 0;i < List.length; i++){
        if(List[i]._id === Id && CryptoJS.AES.decrypt(List[i].password, "Secret Key").toString(CryptoJS.enc.Utf8) === password)
        {
            return true;
        }
    }
    return false;
}
export default SignIn