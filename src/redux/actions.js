export const FETCH_REPO_DATA = 'FETCH_REPO_DATA ';
export const FETCH_REPO_DETAILS = 'FETCH_REPO_DATA_DETAILS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const SET_QUERIES = 'FETCH_SET_QUERIES';


export const fetchRepoData = (repos) => ({
  type: FETCH_REPO_DATA,
  payload: { repos }
});

export const setQueries = (queries) => ({
  type: SET_QUERIES,
  payload: { queries }
});

export const fetchRepoDataDetails = (details) => ({
  type: FETCH_REPO_DETAILS,
  payload: { details }
});

export const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: { error }
});

export const fetchBegin = () => ({
  type: FETCH_BEGIN
});