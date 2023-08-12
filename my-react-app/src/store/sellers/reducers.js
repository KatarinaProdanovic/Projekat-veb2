import { SET_SELLERS, SET_VERIF} from "./types"

const initialState = {
 
  sellers: [],
  isVerif : false
 
}
export const addSellersReducer = (state = initialState.sellers, action) => {
  switch (action.type) {
    case SET_SELLERS:
      return {
        ...state,
        sellers: action.payload
      }
    default:
      return state
  }
}
export const addVerifReducer = (state = initialState.isVerif, action) => {
    switch (action.type) {
      case SET_VERIF:
        return {
          ...state,
          isVerif: action.payload
        }
      default:
        return state
    }
  }