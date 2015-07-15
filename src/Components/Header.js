var React = require('react');
var { Link } = require('react-router');
var AuthorBubble = require('./AuthorBubble');
var config = require('../../config');

require('../Styles/Header.less');
class Header extends React.Component {
    static defaultProps = {
        pages: []
    }

    render() {
        return (
            <div className="header">
                <div className="header-links">
                    <Link className="header-link" to="/">Blogs</Link>
                    <span>
                        {this.props.pages.map(
                            page => <Link className="header-link" to={`/${page.get('slug')}`}>{page.get('title')}</Link>
                        )}
                    </span>
                    <a className="header-link" target="_blank" href={`http://twitter.com/${config.twitter}`}>Twitter</a>
                </div>
                <h1 className="header-title">{this.props.title}</h1>
                <h3 className="header-subtitle">{this.props.subtitle}</h3>
                <AuthorBubble
                    name={`by ${config.primaryAuthor}`}
                    email={config.primaryAuthorEmail}
                    size={60}
                    />
            </div>
        );
    }
}

module.exports = Header;