import { API } from "../utils/api";
import { Comment, Post } from "../utils/Rest";
import { WorksActions, WorksState } from "../reducers/WorksReducer";

import { Dispatch } from "redux";
import { Store } from "../store";
import { UsersState } from "../reducers/UsersReducer";

export const worksFetchDataSuccess = (works: Comment[]) => {
    return {
        type: WorksActions.GET,
        works
    };
}

async function getPost(id: number, state: Store) {
    const post: Post = await fetch(`${API}/posts/${id}`).then(response => response.json());
    const users = state.users as UsersState;
    const userById = users.users.find(v => v.id === post.userId);
    post.user = userById?.user;
    return post;
}

export const worksFetchData = () => {
    return (dispatch: Dispatch, stateF: any) => {
        const state = stateF() as Store;
        const worksLocal = state.works as WorksState;
        const users = state.users as UsersState;
        if (worksLocal.works.length > 0) {
            const works = worksLocal.works.map((v) => {
                const userById = users.users.find(user => v.post?.userId === user.id);
                if (v.post) {
                    v.post.user = userById?.user;
                }
                return v;
            });
            return dispatch(worksFetchDataSuccess(works));
        }
        fetch(`${API}/comments?_limit=100`)
            .then((response) => response.json())
            .then(async (worksFetch: Comment[]) => {
                return Promise.all(worksFetch.map(async (work) => {
                    const post = await (await getPost(work.postId, state).then(resp => resp));
                    work.post = post;

                    return work;
                })).then((works) => {
                    return dispatch(worksFetchDataSuccess(works));
                });
            })
            .catch(error => console.log(error))
    };
}