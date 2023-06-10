import { SET_USER, SET_LOGED_USER, SET_IS_LOGGED } from './types'

export const setUser = user => ({
  // sa njom menjam token
  type: SET_USER,
  payload: user
})
export const setLog = isLogged => ({
  // sa njom menjam token
  type: SET_IS_LOGGED,
  payload: isLogged
})
export const setLoggedUser = loggedUser => ({
  // sa njom menjam token
  type:  SET_LOGED_USER,
  payload: loggedUser
})