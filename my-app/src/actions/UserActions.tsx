import { UsersActions, UsersState } from "../reducers/UsersReducer";

import { API } from "../utils/api";
import { Dispatch } from "redux";
import { Store } from "../store";
import { UserLocal } from "../utils/Rest";

export const usersFetchDataSuccess = (users: UserLocal) => {
    return {
        type: UsersActions.GET,
        users
    };
}

export const usersSetData = (user: UserLocal) => {
    return {
        type: UsersActions.SET,
        user
    };
}

const getUserPhoto = (id: number): Promise<any> => {
    return fetch(`${API}/photos/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const usersFetchData = (id: number) => {
    return (dispatch: Dispatch, stateF: any) => {
        const state = stateF() as Store;
        let user: UserLocal = null;
        const usersLocal = state.users as UsersState;
        const userById = usersLocal.users.find(v => v.id === id);
        if (userById) {
            return dispatch(usersFetchDataSuccess(userById.user));
        }

        fetch(`${API}/users/${id}`)
            .then((response) => response.json())
            .then((userFetch: UserLocal) => {
                user = userFetch;
                return getUserPhoto(user.id).then((img) => {
                    user.photo = img;
                }).then(() => {
                    return dispatch(usersFetchDataSuccess(user));
                });

            })
            .catch(error => console.log(error))
    };
}

export function setUser(user: UserLocal) {
    return (dispatch: Dispatch) => {
        return dispatch(usersSetData(user));
    };
}