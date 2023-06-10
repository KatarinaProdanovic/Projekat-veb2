
import { SET_USER, SET_LOGED_USER, SET_IS_LOGGED} from "./types"

const initialState = {
 
  user: {},
  logedUser: {},
  isLogged : false
 
}
export const addUserReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export const addIsLog = (state = initialState.isLogged, action) => {
  switch (action.type) {
    case SET_IS_LOGGED:
      return {
        ...state,
        isLogged: action.payload
      }
    default:
      return state
  }
}
export const addLoggedUserReducer = (state = initialState.logedUser, action) => {
  switch (action.type) {
    case SET_LOGED_USER:
      return {
        ...state,
        logedUser: action.payload
      }
    default:
      return state
  }
}