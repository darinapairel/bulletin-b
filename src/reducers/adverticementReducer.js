import * as adverticementActions from '../actions/advericementAction'

let localFavourites = localStorage.getItem('favourites')

if (!localFavourites){
    localStorage.setItem('favourites', [])
} else{
    localFavourites = JSON.parse(localFavourites)
}

const initialState = {
    favourites: localFavourites
}

const advList = (state = initialState, action) => {

    switch (action.type) {

        case adverticementActions.ADD_FAVOURITE:

            const {id} = action.payload
            const idx = state.favourites.findIndex(f => f === id)
            const favourites = idx === -1 ? [...state.favourites, id] : state.favourites
            
            localStorage.setItem('favourites', JSON.stringify(favourites))

            return {...state, favourites}

        default: return state    
    }
   
}

export default advList
