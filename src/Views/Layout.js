var React = require('react');
var DocumentTitle = require('react-document-title');
var Container = require('../Mixins/Container');

var Header = require('../Components/Header');
var BlogHeader = require('../Components/BlogHeader');
var Footer = require('../Components/Footer');
var Home = require('../Views/Home');

if(__CLIENT__) require('../Styles/Layout.less');
class Layout extends React.Component {
    render() {
        return (
            <DocumentTitle title="Intelligible Babble">
                <div>
                    <BlogHeader
                        title="Intelligible Babble"
                        subtitle="Programming, Startups, Hacking, Nonsense"
                        pages={this.props.pages}
                        />
                    <div className="container">
                        {this.props.children || <Home {...this.props} />}
                    </div>
                    <Footer />
                </div>
            </DocumentTitle>
        );
    }
}

module.exports = Container.create(Layout, ['SummaryStore'], {
    getComponentProps([ SummaryStore ]) {
        return {
            pages: [] // SummaryStore.listAll({ scope: "pages" }, 0)
        };
    }
});

//module.exports = Layout;