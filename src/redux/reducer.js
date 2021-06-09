export const FETCH_REPO_DATA = 'FETCH_REPO_DATA ';
export const FETCH_REPO_DETAILS = 'FETCH_REPO_DATA_DETAILS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const SET_QUERIES = 'FETCH_SET_QUERIES';

const initialState = {
  repos: [],
  repoDetails: {},
  owner: '',
  page: '',
  repoName: '',
  sortType: '',
  language: '',
  keywords: '',
  loading: false,
  error: null
};

export default function reposReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_BEGIN:
      // Mark the state as "loading" 
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_REPO_DATA:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        repos: action.payload.repos
      };

      case FETCH_REPO_DETAILS:
      return {
        ...state,
        loading: false,
        repoDetails: action.payload.details
      };

      case SET_QUERIES:
      return {
        ...state,
        language: action.payload.queries.language,
        page: action.payload.queries.page,
        keywords: action.payload.queries.keywords,
        sortType: action.payload.queries.sortType,
      };

    case FETCH_FAILURE:
      // The request failed
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}