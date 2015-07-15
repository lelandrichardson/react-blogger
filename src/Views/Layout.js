var React = require('react');
var Helmet = require('react-helmet');
var Container = require('../Mixins/Container');

var Header = require('../Components/Header');
var BlogHeader = require('../Components/BlogHeader');
var Footer = require('../Components/Footer');
var Home = require('../Views/Home');

if(__CLIENT__) require('../Styles/Layout.less');
class Layout extends React.Component {
    render() {
        return (
            <div>
                <Helmet title="Intelligible Babble" />
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