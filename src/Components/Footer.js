var React = require('react');

const year = (new Date()).getFullYear();

if (__CLIENT__) require('../Styles/Footer.less');
class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                &copy; {year} Leland Richardson
            </div>
        )
    }
}

module.exports = Footer;