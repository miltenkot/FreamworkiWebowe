import { API } from "../utils/api";
import { PublicationsActions, PublicationsState } from "../reducers/PublicationsReducer";

import { Dispatch } from "redux";
import { Post } from "../utils/Rest";
import { Store } from "../store";
import { UsersState } from "../reducers/UsersReducer";

export const publicationsFetchDataSuccess = (publications: Post[]) => {
    return {
        type: PublicationsActions.GET,
        publications
    };
}

const getPhoto = (id: number): Promise<any> => {
    return fetch(`${API}/photos/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const publicationsFetchData = () => {
    return (dispatch: Dispatch, stateF: any) => {
        const state = stateF() as Store;
        const publicationsLocal = state.publications as PublicationsState;
        const users = state.users as UsersState;
        if (publicationsLocal.publications.length > 0) {
            const pubs = publicationsLocal.publications.map((v) => {
                const userById = users.users.find(user => v.userId === user.id);
                v.user = userById?.user;
                return v;
            });
            return dispatch(publicationsFetchDataSuccess(pubs));
        }
        fetch(`${API}/posts?_limit=4`)
            .then((response) => response.json())
            .then((publicationsFetch: Post[]) => {
                return Promise.all(publicationsFetch.map(async (publ) => {
                    publ.photo = await getPhoto(publ.id);

                    return publ;
                })).then((publs) => {
                    return dispatch(publicationsFetchDataSuccess(publs));
                });
            })
    };
}