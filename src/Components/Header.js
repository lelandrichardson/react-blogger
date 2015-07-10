var React = require('react');
var { Link } = require('react-router');

var AuthorBubble = require('./AuthorBubble');

if (__CLIENT__) require('../Styles/Header.less');
class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h2 className="header-title"><Link to="/">Intelligible Babble</Link></h2>
                <h3 className="header-subtitle">Programming, Startups, Hacking, Nonsense</h3>
                <AuthorBubble
                    name="Leland Richardson"
                    email="leland@tech.pro"
                    size={80}
                />
            </div>
        );
    }
}

module.exports = Header;