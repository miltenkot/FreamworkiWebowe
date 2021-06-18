import { combineReducers } from 'redux';
import publications from './PublicationsReducer';
import users from './UsersReducer';
import works from './WorksReducer';

export default combineReducers({
    users,
    works,
    publications
});