import React from 'react';
import './exchange.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
class Exchange extends React.Component{
    constructor(){
        super();
        this.state={
            wallet:'',
            money:'',
            List:[],
            historyEx: [
                {
                    IDnhan:'',
                    IDGui:'',
                    now:''
                }
            ],
        }
        this.updateWallet = this.updateWallet.bind(this);
        this.updateMoney = this.updateMoney.bind(this);
    };
    updateWallet(e) {
        this.setState({wallet: e.target.value});
    }
    updateMoney(e) {
        this.setState({money: e.target.value});
    }

    btnSend() {
        const history=this.state.historyEx.slice();
        const IDgui=this.props.location.state.IDvi;
        const IDnhan=this.state.wallet;

        this.setState({
            historyEx: history.concat([
                {
                    IDGui:IDgui,
                    IDnhan:IDnhan,
                    now:new Date()
                }
            ]),

        });
        let moneysend = 0;
        let moneyreceive = 0;
        for (let i = 0; i < this.state.List.length; i++) {
            if (this.state.List[i]._id === this.props.location.state.IDvi) {
                moneysend = this.state.List[i].money - Number.parseInt(this.state.money, 10);
            }
            if (this.state.List[i]._id === this.state.wallet) {
                moneyreceive = this.state.List[i].money + Number.parseInt(this.state.money, 10);
            }
        }
        setTimeout(()=>{
            axios.put('https://mystoganwebapi.herokuapp.com/api/admin' + this.props.location.state.IDvi, {newmoney: moneysend,HistoryExchange:this.state.historyEx})
                .then(function (res) {
                    console.log(res);
                }).catch(function (err) {
                console.log(err);
            });
            axios.put('https://mystoganwebapi.herokuapp.com/api/admin' + this.state.wallet, {newmoney: moneyreceive,HistoryExchange:this.state.historyEx})
                .then(function (res) {
                    console.log(res);
                }).catch(function (err) {
                console.log(err);
            });
        },2000);

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
                IDvi:this.props.location.state.IDvi,
            }
        });
    }
    mySignOut2(){
        this.props.history.push({
            pathname:'/signin',
        });//chuyển qua trang khác
    }
    ShowEx(){
        const moves = this.state.historyEx.map((step, move) => {
            return (
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

            );
        });
        setTimeout(()=>{
            ReactDOM.render(moves,document.getElementById('test2'));
            },1000);


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

                    this.setState({historyEx:this.state.List[i].HistoryEx});
                    console.log(this.state.historyEx);
                }
            }
        },2000);

    }
    render(){
        return(
            <div id="exchange">
                <div className="header">BLOCKCHAIN</div>
                <button className="signout btn btn-primary" onClick={()=>this.mySignOut2()}>SignOut</button>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs-12 left">
                            <ul className="nav nav-pills nav-stacked">
                                <li role="presentation"><a onClick={()=>this.myClickDashboard()}>DASHBOARD</a></li>
                                <li role="presentation"><a onClick={()=>this.myClickExchange()}>EXCHANGE</a></li>
                            </ul>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12 right">
                            <div className="btn-group exchanged">
                                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal">Gửi</button>
                            </div>
                            <div className="btn-group exchanged">
                                <button type="button" className="btn btn-success">Nhận</button>
                            </div>
                            <div className="btn-group exchanged">
                                <button type="button" className="btn btn-primary" onClick={()=>this.ShowEx()}>Tất cả giao dịch</button>
                            </div>
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
                                <div id="test2"></div>
                            </div>
                        </div>

                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title">Gửi</h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="Inputwallet">ID Ví</label>
                                                <input type="text" className="form-control" id="Inputwallet" value = {this.state.wallet}
                                                       onChange = {this.updateWallet} />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Inputmoney">Số tiền</label>
                                                <input type="text" className="form-control" id="Inputmoney" value = {this.state.money}
                                                       onChange = {this.updateMoney}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" className="btn btn-lg btn-info btn-block" value="GỬI" onClick={()=>this.btnSend()}/>
                                            </div>
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
export default Exchange