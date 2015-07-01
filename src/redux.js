import { createDispatcher, createRedux, composeStores } from 'redux'
import loggerMiddleware from './Lib/loggerMiddleware.js'

const stores = {
    BlogStore: require('./Stores/BlogStore'),
    SummaryStore: require('./Stores/SummaryStore')
};

const dispatcher = createDispatcher(
    composeStores(stores),
    getState => [ loggerMiddleware ]
);

export default redux = createRedux();

