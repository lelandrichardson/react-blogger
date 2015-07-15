var React = require('react');
var config = require('../../config');

const year = (new Date()).getFullYear();

require('../Styles/Footer.less');
class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                &copy; {year} {config.primaryAuthor}
            </div>
        );
    }
}

module.exports = Footer;