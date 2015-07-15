var React = require('react');
var Helmet = require('react-helmet');

require('../Styles/Login.less');
class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <Helmet title={`Login - ${config.title}`} />
                <form className="login-form" method="POST">
                    <input className="login-input" type="text" name="username" placeholder="Username" /><br/>
                    <input className="login-input" type="password" name="password" placeholder="Password" /><br/>
                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        );
    }
}

module.exports = Login;