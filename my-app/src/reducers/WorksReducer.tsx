import { AnyAction } from "redux";
import { IComment } from "../utils/Rest";

export interface WorksState {
    works: IComment[]
};

const defaultState = (): WorksState => ({
    works: []
});

export enum WorksActions {
    'GET' = 'GET_WORKS',
}


export default (state = defaultState(), action: any) => {
    switch (action.type) {
        case WorksActions.GET: {
            return {
                ...state,
                works: action.works
            };
        }
        default:
            return state;
    }
}