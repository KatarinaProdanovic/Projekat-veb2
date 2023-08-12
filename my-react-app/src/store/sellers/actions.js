import { SET_SELLERS, SET_VERIF} from './types'

export const setSelleer = sellers => ({
  // sa njom menjam token
  type: SET_SELLERS,
  payload: sellers
})
export const setVerif = isVerif => ({
    // sa njom menjam token
    type: SET_VERIF,
    payload: isVerif
  })
