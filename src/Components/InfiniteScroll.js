var React = require('react');
var { Component, PropTypes } = React;
var throttle = require('lodash/function/throttle');

class InfiniteScroll extends React.Component {
    static propTypes = {
        hasMore: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        threshold: PropTypes.number,
        throttle: PropTypes.number
    };
    static defaultProps = {
        threshold: 100,
        throttle: 64
    };
    constructor(props, context) {
        super(props, context);
        this.check = throttle(this.check.bind(this), props.throttle);
    }
    check() {
        var { isLoading, hasMore, threshold, onLoadMore } = this.props;
        if (isLoading || !hasMore) {
            return;
        }
        var sentinel = this.refs.sentinel.getDOMNode();
        var fromBottom = sentinel.getBoundingClientRect().top - window.innerHeight;
        if (fromBottom < threshold) {
            onLoadMore();
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.check);
        window.addEventListener('resize', this.check);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.check);
        window.removeEventListener('resize', this.check);
    }
    render() {
        return (
            <div>
                {this.props.children}
                <div ref="sentinel" />
            </div>
        );
    }
}

module.exports = InfiniteScroll;