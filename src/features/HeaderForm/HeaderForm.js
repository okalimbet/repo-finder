import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './HeaderForm.css'
import { makeStyles } from '@material-ui/core/styles';
import { fetchBegin, fetchFailure, fetchRepoData, setQueries } from '../../redux/actions';
import { baseUrl } from '../../apiCalls'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const HeaderForm = () => {
  const [query, setQuery] = useState({
    keywords: '',
    sortType: '',
    language: '',
    page: 1
  });
  const classes = useStyles();
  const [languages, setLanguages] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const keywords = useSelector(state => state.keywords);

  //For the error catching and loading screens
  // const loading = useSelector(state => state.loading);
  // const error = useSelector(state => state.error);

  const fetchData = async (page=1) => {
    if(keywords) {
      let nameInput = !keywords ? '' : `&q=${keywords}`;
      let languageInput = !query.language ? '' : `+language:${query.language}`;
      let sortTypeInput = !query.sortType ? '' : `&sort=${query.sortType}`;
      let pageInput = `&page=${query.page}`;
      let inputInfo = nameInput+languageInput+pageInput+sortTypeInput;
      dispatch(fetchBegin(true));
      await axios.get(`${baseUrl}${inputInfo}`)
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

  const handleChange = (e) => {
    e.preventDefault() 
    let inputPhrase = e.target.value;
    let associatedQuery = e.target.name;

    if(!inputPhrase) { 
      setQuery({...query, [associatedQuery]: ''})
    }
    setQuery({...query, [associatedQuery]: inputPhrase})
  }

  const handleSelectSort = async (e) => {
    e.preventDefault();
    let inputFilter = e.target.value;
    let associatedQuery = e.target.name;
    setQuery({...query, [associatedQuery]: inputFilter});
  }

    const cleanQueries = () => {
      setQuery({...query,
        language: '',
        page: 1
      })
      setLanguages(null)
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQueries(query));
    if(!query.keywords) {
      dispatch(fetchRepoData([]))
      cleanQueries()
    }
    cleanQueries()
  }
  const handlePageChange = (e, value) => {
    setQuery({...query, page: value})
  }

  useEffect(() => {
    fetchData()
  }, [query])

  return (
    <section className='header-container'>
      <h1>RepoFinder</h1>
      <form className="header-form" autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"keywords"} label="Search..." type="search" />
          <Button type="submit" color="primary">Submit</Button>
      </form>
      {!!repos.items &&
        <div className="sort-filter-container">
          <div>
            <FormControl className="form filter-wrapper" onSubmit={(e) => handleSubmit(e)}>
            <InputLabel id="languages"></InputLabel>
            <Select
              labelId="languages"
              id="language"
              name="language"
              displayEmpty
              value={query.language}
              onChange={(e) => handleSelectSort(e)}
            >
              <MenuItem value="">
                <em>All Languages</em>
              </MenuItem>
              {
                languages &&
                  Object.keys(languages).sort((a,b) => languages[b] - languages[a]).map(languageName => {
                    return(
                      <MenuItem key={`sort-${languageName}`}value={`${languageName}`}>{`${languageName}`}<span>{languages[languageName]}</span></MenuItem>
                    )
                  })
              }
            </Select>
            <FormHelperText>Sort By</FormHelperText>
            </FormControl>
            <FormControl className="form sort-wrapper" onSubmit={(e) => handleSubmit(e)}>
              <InputLabel id="sort"></InputLabel>
              <Select
                labelId="sort"
                id="sortType"
                name="sortType"
                displayEmpty
                value={query.sortType}
                onChange={(e) => handleSelectSort(e)}
              >
                <MenuItem value="">
                  <em>Best Match</em>
                </MenuItem>
                <MenuItem value={"stars"}>Stars</MenuItem>
              </Select>
              <FormHelperText>Sort By</FormHelperText>
            </FormControl>
          </div>
          <Pagination count={repos.total_count > 1000 ? Math.floor(1000/30)+1 : Math.floor(repos.total_count/30)+1} page={query.page} onChange={handlePageChange} variant="outlined" shape="rounded" />
        </div>
      }
    </section>
  )
}

export default HeaderForm;