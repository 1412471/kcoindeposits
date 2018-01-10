import React from 'react';
import { Switch, Route} from 'react-router-dom';
import SignIn from './signin';
import SignUp from './signup';
import Main from './Main'
import Dashboard from "./dashboard";
import Exchange from './exchange'

class App extends React.Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/exchange" component={Exchange}/>
                </Switch>
            </div>

        );
    }
}

export default App;