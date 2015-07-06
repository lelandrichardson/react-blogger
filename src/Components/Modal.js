var React = require('react');
var Portal = require('./Portal');
var cx = require('classnames');

require('../Styles/Modal.less');
class Modal extends React.Component {
    render() {
        const { visible, children, onClose } = this.props;
        return (
            <Portal>
                <div className={cx("modal", visible && "visible")}>
                    <div className="modal-backdrop" onClick={onClose}></div>
                    <div className="modal-window">
                        <a className="modal-close-button" onClick={onClose}>&times;</a>
                        <div className="modal-inner clearfix">
                            {children}
                        </div>
                    </div>
                </div>
            </Portal>
        );
    }
}

module.exports = Modal;