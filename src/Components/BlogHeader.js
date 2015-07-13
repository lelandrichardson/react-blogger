var React = require('react');
var { Link } = require('react-router');
var AuthorBubble = require('./AuthorBubble');

if (__CLIENT__) require('../Styles/Header.less');
class BlogHeader extends React.Component {
    static defaultProps = {
        pages: []
    }

    render() {
        return (
            <div className="header">
                <div className="header-links">
                    <Link className="header-link" to="/">Blogs</Link>
                    <Link className="header-link" to="/about-me">About Me</Link>
                    <span>
                        {this.props.pages.map(
                            page => <Link className="header-link" to={`/${page.get('slug')}`}>{page.get('title')}</Link>
                        )}
                    </span>
                    <a className="header-link" target="_blank" href="http://twitter.com/intelligibabble">Twitter</a>
                </div>
                <h1 className="header-title">{this.props.title}</h1>
                <h3 className="header-subtitle">{this.props.subtitle}</h3>
                <AuthorBubble
                    name="by Leland Richardson"
                    email="leland@tech.pro"
                    size={60}
                    />
            </div>
        );
    }
}

module.exports = BlogHeader;