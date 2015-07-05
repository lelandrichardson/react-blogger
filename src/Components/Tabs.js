var React = require('react');
var { Link } = require('react-router');
var cx = require('classnames')

require('../Styles/Tabs.less');
export class Tabs extends React.Component {
    render() {
        return (
            <div className="tab-bar">
                {this.props.children}
            </div>
        );
    }
}

export class Tab extends React.Component {
    render() {
        const { style, to, active } = this.props;
        return (
            <Link {...{ style, to }} className={cx("tab-bar-item", active && "is-active")}>
                <span className="tab-bar-label">{this.props.children}</span>
            </Link>
        );
    }
}