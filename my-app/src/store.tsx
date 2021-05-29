import { applyMiddleware, createStore } from 'redux';
import { NotificationState } from './reducers/NotificationReducer';
import { FullscreenState } from './reducers/FullscreenReducer';
import { WorksState } from './reducers/WorksReducer';
import { UsersState } from './reducers/UsersReducer';
import { PublicationsState } from './reducers/PublicationsReducer';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export interface IStore {
    NotificationReducer: NotificationState
    FullscreenReducer: FullscreenState,
    fetchData: Function,
    works: WorksState,
    users: UsersState,
    publications: PublicationsState,
}

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}