import Http from './Http.js';

const DEFAULT = new Http();

export default function Api(http = DEFAULT) {
    var { GET, POST, PUT } = http;
    return {
        blog: {
            list: filter => GET(`blog/list`, filter),
            get: id => GET(`blog/${id}`),
            getFromSlug: slug => GET(`blog/from-slug/${slug}`),
            create: model => PUT(`blog`, model),
            update: model => POST(`blog/${model.id}`, model),
            updateBody: (id, body) => POST(`blog/${id}/body`, { body }),
            publish: id => POST(`blog/${id}/publish`),
            unpublish: id => POST(`blog/${id}/unpublish`),
            remove: id => POST(`blog/${id}/remove`)
        }
    }
}