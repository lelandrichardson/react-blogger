var React = require('react');
var DocumentTitle = require('react-document-title');


require('../Styles/Login.less');
class Register extends React.Component {
    render() {
        return (
            <DocumentTitle title="Register - Intelligible Babble">
                <div className="login">
                    <form className="login-form" method="POST">
                        <input className="login-input" type="text" name="name" placeholder="Display Name" /><br/>
                        <input className="login-input" type="text" name="username" placeholder="Username" /><br/>
                        <input className="login-input" type="password" name="password" placeholder="Password" /><br/>
                        <button className="login-button" type="submit">Register</button>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Register;