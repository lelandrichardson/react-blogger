var React = require('react');
var { RouteHandler } = require('react-router');
var DocumentTitle = require('react-document-title');

require('../Styles/Dashboard.less');
class Layout extends React.Component {
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

module.exports = Layout;