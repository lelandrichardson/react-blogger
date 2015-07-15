var React = require('react');
var { Link } = require('react-router');
var cx = require('classnames');

require('../Styles/Toolbar.less');
export class Toolbar extends React.Component {
    render() {
        return (
            <div className="toolbar">
                {this.props.children}
            </div>
        );
    }
}

export class ToolbarButton extends React.Component {
    render() {
        const { style, onClick, className } = this.props;
        return (
            <a {...{ style, onClick }} className={cx("toolbar-item", className)}>
                <div className="toolbar-label">{this.props.children}</div>
            </a>
        );
    }
}

export class ToolbarLink extends React.Component {
    render() {
        const { style, to, onClick, activeStyle, activeClassName, query, state, className } = this.props;
        return (
            <Link {...{ style, to, onClick, activeStyle, activeClassName, query, state }} className={cx("toolbar-item", className)}>
                <div className="toolbar-label">{this.props.children}</div>
            </Link>
        );
    }
}

export class ToolbarText extends React.Component {
    render() {
        const { style, className } = this.props;
        return (
            <div {...{ style }} className={cx("toolbar-item", className)}>
                <div className="toolbar-label">{this.props.children}</div>
            </div>
        );
    }
}