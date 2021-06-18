import { IPost } from "../utils/Rest";

export interface PublicationsState {
    publications: IPost[];
}

const defaultState = (): PublicationsState => ({
    publications: []
});

export enum PublicationsActions {
    'GET' = 'GET_PUBLICATIONS',
}

const PublicationsReducer = (state = defaultState(), action: any) => {
    switch (action.type) {
        case PublicationsActions.GET: {
            return {
                ...state,
                publications: action.publications
            };
        }
        default:
            return state;
    }
}

export default PublicationsReducer;