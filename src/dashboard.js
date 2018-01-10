import React from 'react';
import './dashboard.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
class Dashboard extends React.Component{
    constructor(){
        super();
        this.state={
            List:[],
            money:0,
            exchange:[
                {
                    IDnhan:'',
                    IDGui:'',
                    now:''
                }
            ]
        }
    }
    componentWillMount(){
        var self=this;
        axios.get('https://mystoganwebapi.herokuapp.com/api/admin')
            .then(function (res) {
                self.setState({List:res.data});
            }).catch(function (err) {
            console.log(err);

        });
        setTimeout(()=>{

            for(let i=0;i<this.state.List.length;i++)
            {
                if(this.props.location.state.IDvi && this.props.location.state.IDvi===this.state.List[i]._id)
                {

                    this.setState({exchange:this.state.List[i].HistoryEx,money:this.state.List[i].money});
                }
            }
        },2000);

    }
    mySignOut(){
        this.props.history.push({
            pathname:'/signin',
        });//chuyển qua trang khác
    }
    myClickExchange(){
        this.props.history.push({
            pathname:'/exchange',
            state:{
                IDvi:this.props.location.state.IDvi
            }
        });
    }
    myClickDashboard(){
        this.props.history.push({
            pathname:'/dashboard',
            state:{
                IDvi:this.props.location.state.IDvi
            }
        });
    }
    render(){
        let length=this.state.exchange.length;
        let start;
        if(length>=4)
        {
            start=length-3;
        }
        else{
            start=0;
        }

        const moves = this.state.exchange.map((step, move) => {

            if(move>=start)
            {
                return (
                    <div key={move}>
                        <div key={move}>
                            <div className="col-sm-4 col-xs-12">
                                {step.IDGui}
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                {step.IDnhan}
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                {step.now}
                            </div>
                        </div>
                    </div>

                );
            }
            else{
                return (
                    <div></div>
                );
            }

        });
        setTimeout(()=>{
            ReactDOM.render(moves,document.getElementById('test'));
        },1000);
            return(
                <div id="dashboard">
                    <div className="header">BLOCKCHAIN</div>
                    <button className="signout btn btn-primary" onClick={()=>this.mySignOut()}>SignOut</button>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 left">
                                <ul className="nav nav-pills nav-stacked">
                                    <li role="presentation"><a onClick={()=>this.myClickDashboard()}>DASHBOARD</a></li>
                                    <li role="presentation"><a onClick={()=>this.myClickExchange()}>EXCHANGE</a></li>
                                </ul>
                            </div>
                            <div className="col-md-8 right">
                                {this.state.money} BTC
                                <div className="col-sm-12 col-md-12 content" >
                                    <div className="col-sm-4 col-xs-12">
                                        ID Gửi
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        ID Nhận
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        Thời gian
                                    </div>
                                    <div id="test"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

    }
}

export default Dashboard