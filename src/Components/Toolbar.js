var React = require('react');
var { Link } = require('react-router');

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
        const { style, onClick } = this.props;
        return (
            <a {...{ style, onClick }} className="toolbar-item">
                <div className="toolbar-label">{this.props.children}</div>
            </a>
        );
    }
}

export class ToolbarLink extends React.Component {
    render() {
        const { style, to, onClick, activeStyle, activeClassName, query, state } = this.props;
        return (
            <Link {...{ style, to, onClick, activeStyle, activeClassName, query, state }} className="toolbar-item">
                <div className="toolbar-label">{this.props.children}</div>
            </Link>
        );
    }
}

export class ToolbarText extends React.Component {
    render() {
        const { style, to, onClick, activeStyle, activeClassName, query, state } = this.props;
        return (
            <div {...{ style }} className="toolbar-item">
                <div className="toolbar-label">{this.props.children}</div>
            </div>
        );
    }
}