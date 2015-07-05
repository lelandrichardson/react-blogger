var React = require('react');
var Container = require('../Mixins/Container');

var BlogStore = require('../Stores/BlogStore');
var BlogActions = require('../Actions/BlogActions');

var Loading = require('../Components/Loading');
var Api = require('../Lib/Api');

class CreateBlog extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    componentDidMount() {
        const { router } = this.context;
        Api.blog
            .create({ title: "(Untitled)" })
            .then(({ id }) => router.transitionTo(`/admin/edit/${id}`));
    }
    render() {
        return <Loading />
    }
}

module.exports = CreateBlog;