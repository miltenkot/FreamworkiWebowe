import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { WorksState } from './reducers/WorksReducer';
import { UsersState } from './reducers/UsersReducer';
import { PublicationsState } from './reducers/PublicationsReducer';
import reducer from './reducers';


export interface IStore {
    fetchData: Function,
    works: WorksState,
    users: UsersState,
    publications: PublicationsState,
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;