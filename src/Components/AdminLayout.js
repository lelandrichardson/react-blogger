var React = require('react');

class AdminLayout extends React.Component {
    render() {
        return (
            <div>
                <Toolbar>
                    {this.props.renderToolbar()}
                </Toolbar>
                <div className="">{this.props.children}</div>
            </div>
        );
    }
}

module.exports = AdminLayout;