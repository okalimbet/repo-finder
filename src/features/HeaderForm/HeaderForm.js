import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './HeaderForm.css'
import { fetchBegin, fetchFailure, fetchRepoData, setQueries, setKeywords } from '../../redux/actions';
import { baseUrl } from '../../apiCalls'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import Loading from '../Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';

const HeaderForm = () => {
  const [keywordInput, setKeywordInput] = useState('')
  const [query, setQuery] = useState({
    sortType: '',
    language: '',
    page: 1
  });

  const [languages, setLanguages] = useState();
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const keywords = useSelector(state => state.keyword);
  const page = useSelector(state => state.page);

  //For the error catching and loading screens
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  //methos to fetch repositories based on search and filters
  const fetchData = async () => {
    if(keywords) {
      let nameInput = !keywords ? '' : `&q=${keywords}`;
      let languageInput = !query.language ? '' : `+language:${query.language}`;
      let sortTypeInput = !query.sortType ? '' : `&sort=${query.sortType}`;
      let pageInput = `&page=${page}`;
      let inputInfo = nameInput+languageInput+pageInput+sortTypeInput;
      dispatch(fetchBegin(true));
      await axios.get(`${baseUrl}search/repositories?&order=desc${inputInfo}`)
        .then(res =>
          {
            dispatch(fetchRepoData(res.data))
            if(!languages) {
            handleLanguages(res.data)
            }
          }
        )
        .catch(error => dispatch(fetchFailure(error)));
    } else {
      return;
    }
  }
  
  //get a list of possible languges from limited 30 items per page
  const handleLanguages = async (data) => {
    if(data.items) {
      const allLanguagesFromRepos = data.items.reduce((allLanguages, oneRepo) => {
          if(!allLanguages[oneRepo.language] && oneRepo.language != null) {
            allLanguages[oneRepo.language] = 0
          };
          if(oneRepo.language != null) {
          allLanguages[oneRepo.language] += 1;
          }
        return allLanguages;
      }, {})
      await setLanguages(allLanguagesFromRepos)
    }
  }

  //handle change of keywords
  const handleChange = (e) => {
    e.preventDefault() 
    let inputPhrase = e.target.value;
    if(!inputPhrase) { 
      setKeywordInput('')
    }
    setKeywordInput(inputPhrase)
  }

  //handle filter by language and sort
  const handleSelectSort = async (e) => {
    e.preventDefault();
    let inputFilter = e.target.value;
    let associatedQuery = e.target.name;
    dispatch(setQueries({...query, page: 1}));
    setQuery({...query, 
      [associatedQuery]: inputFilter,
      page: 1
    });
  }

  //clean queries and languges
  const cleanQueries = () => {
    setQuery({...query,
      language: '',
      sortType: '',
      page: 1
    })
    setLanguages(null)
  }

  //handle submit of keywords
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setKeywords({keyword: keywordInput}));
    if(!keywordInput) {
      dispatch(fetchRepoData([]))
      dispatch(setKeywords(''))
      cleanQueries()
    }
    cleanQueries()
  }

  //handle page change in pagination
  const handlePageChange = (e, value) => {
    setQuery({...query, page: value});
    dispatch(setQueries({...query, page: value}));
  }
 
  useEffect(() => {
    if(keywords) {
      fetchData()
    }
  }, [keywords])

  useEffect(() => {
      fetchData()
  }, [query])

  if(error) {
    return <ErrorPage/>
  } else {
    return (
      <>
      {loading === false ? (
        <section data-cy="header-wrap" className='header-container'>
          <h1>RepoFinder</h1>
          <form data-cy="search-form" className="header-form" autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
              <TextField helperText="Search..." required data-cy="submit-input" id="standard-search" onChange={(e) => handleChange(e)} name={"keywords"} type="search" />
              <Button data-cy="submit" type="submit" color="primary">Submit</Button>
          </form>
          {!!repos.items &&
            <div data-cy="sort-filter-wrap" className="sort-filter-container">
              <div>
                <FormControl data-cy="select-languages-form" className="form filter-wrapper">
                <InputLabel id="languages"></InputLabel>
                <Select
                  labelId="languages"
                  id="language"
                  name="language"
                  displayEmpty
                  value={query.language}
                  onChange={(e) => handleSelectSort(e)}
                  data-cy="select-language"
                >
                  <MenuItem value="">
                    <em>All Languages</em>
                  </MenuItem>
                  {
                    languages &&
                      Object.keys(languages).sort((a,b) => languages[b] - languages[a]).map(languageName => {
                        return(
                          <MenuItem className="menu-item" key={`sort-${languageName}`} value={`${languageName}`}>{`${languageName}`}</MenuItem>
                        )
                      })
                  }
                </Select>
                <FormHelperText>Fitler by</FormHelperText>
                </FormControl>
                <FormControl data-cy="sort-form" className="form sort-wrapper">
                  <InputLabel id="sort"></InputLabel>
                  <Select
                    labelId="sort"
                    id="sortType"
                    name="sortType"
                    displayEmpty
                    value={query.sortType}
                    onChange={(e) => handleSelectSort(e)}
                    data-cy="select-sort"
                  >
                    <MenuItem data-cy="best-match" value="">
                      <em>Best Match</em>
                    </MenuItem>
                    <MenuItem data-cy="stars" value={"stars"}>Stars</MenuItem>
                  </Select>
                  <FormHelperText>Sort by </FormHelperText>
                </FormControl>
              </div>
              <Pagination className="pagination" data-cy="pagination" count={repos.total_count > 1000 ? Math.floor(1000/30)+1 : Math.floor(repos.total_count/30)+1} page={parseInt(page)} onChange={handlePageChange} variant="outlined" shape="rounded" />
            </div>
          }
        </section>) : (
          <Loading/>
          )
        }
      </>
    )
    }
}

export default HeaderForm;