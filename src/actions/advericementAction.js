export const ADD_FAVOURITE = 'ADD_FAVOURITE'

export function addToFavourite(id){
    return {
        type: ADD_FAVOURITE,
        payload: {id}
    }
}