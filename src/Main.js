import React from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
class Main extends React.Component{
    render(){
        console.log(this.props.location.state);
        return(
            <div>
                <div className="header">BLOCKCHAIN</div>
                <div className="getfreewallet">
                    <Link to="/signin" className="main">GET A FREE WALLET</Link>
                </div>
            </div>
        );
    }
}
export default Main