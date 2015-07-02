var React = require('react');
var DocumentTitle = require('react-document-title');

require('../Styles/Dashboard.less');
class Dashboard extends React.Component {
    render() {
        return (
            <DocumentTitle title="Intelligible Babble">
                <div>
                    <div>Dashboard</div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Dashboard;