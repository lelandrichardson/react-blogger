var React = require('react');
var Helmet = require('react-helmet');
var Container = require('../Mixins/Container');
var config = require('../../config');

var Header = require('../Components/Header');
var Footer = require('../Components/Footer');
var Home = require('../Views/Home');

require('../Styles/Layout.less');
class Layout extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    title={config.title}
                    meta={[
                        { name: "viewport", content: "user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" },
                        { name: "twitter:card", value: "summary"},
                        { name: "twitter:site", value: `@${config.twitter}` },
                        { name: "twitter:creator", value: `@${config.twitter}` },
                        { property: "keywords", content: config.keywords },
                        { property: "description", content: config.description },
                        { property: "og:description", content: config.description },
                        { property: "og:title", content: config.title },
                        { property: "og:site_name", content: config.title },
                        //{ property: "og:type", content: "article" },
                        //{ property: "og:image", content: "" }, //TODO:
                        //{ property: "og:url", content: "" }, //TODO:
                    ]}
                    link={[
                        { rel: "icon", href: "/favicon.ico" },
                        { rel: "shortcut icon", href: "/favicon.ico" },
                        { rel: "apple-touch-icon", sizes: "57x57", href: "/favicon.ico" }, //TODO:
                        //{ rel: "canonical", href: "" }, //TODO:
                    ]}
                    />
                {this.props.children}
            </div>
        );
    }
}

module.exports = Layout;