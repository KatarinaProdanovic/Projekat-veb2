import { SET_ARTICLE} from "./types"

const initialState = {
 
  articles: {},
  
 
}
export const addArticleReducer = (state = initialState.articles, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        ...state,
        articles: action.payload
      }
    default:
      return state
  }
}