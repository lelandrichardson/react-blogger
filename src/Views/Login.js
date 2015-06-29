var React = require('react');
var DocumentTitle = require('react-document-title');

require('../Styles/Login.less');
class Login extends React.Component {
    render() {
        return (
            <DocumentTitle title="Intelligible Babble">
                <div>
                    <div>Dashboard</div>
                    <div>
                        <RouteHandler {...this.props} />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Login;