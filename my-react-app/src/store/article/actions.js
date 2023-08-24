import { SET_ARTICLE} from './types'

export const setArticle = articles => ({
  // sa njom menjam token
  type: SET_ARTICLE,
  payload: articles
})