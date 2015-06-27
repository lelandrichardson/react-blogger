var React = require('react');
var { RouteHandler } = require('react-router');
var DocumentTitle = require('react-document-title');

var Header = require('../Components/Header');
var Footer = require('../Components/Footer');

require('../Styles/Layout.less');
class Layout extends React.Component {
    render() {
        return (
            <DocumentTitle title="Intelligible Babble">
                <div>
                    <Header />
                    <div className="container">
                        <RouteHandler {...this.props} />
                    </div>
                    <Footer />
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Layout;