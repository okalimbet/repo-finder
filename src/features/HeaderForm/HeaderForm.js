import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './HeaderForm.css'
import {fetchBegin, fetchFailure, fetchRepoData, setQueries} from '../../redux/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import axios from "axios";

const HeaderForm = () => {
  const [query, setQuery] = useState({
    keywords: '',
    sortType: '',
    language: '',
    page: ''
  });

const [languages, setLanguages] = useState()
const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const keywords = useSelector(state => state.keywords);
  const sortType = useSelector(state => state.sortType);
  // const loading = useSelector(state => state.loading);
  // const error = useSelector(state => state.error);
  const language = useSelector(state => state.language);

  const fetchData = async (page=1) => {
    if(keywords) {
      let nameInput = !keywords ? '' : `&q=${keywords}`;
      let languageInput = !query.language ? '' : `+language:${query.language}`;
      let sortTypeInput = !query.sortType ? '' : `&sort=${query.sortType}`;
      let inputInfo = nameInput+languageInput+sortTypeInput
    dispatch(fetchBegin(true));
    await axios.get(`https://api.github.com/search/repositories?&order=desc&${inputInfo}`)
      .then(res =>
        {
          dispatch(fetchRepoData(res.data))
          if(!languages) {
          handleLanguages(res.data)
          }
        }
      )
      .catch(error => dispatch(fetchFailure(error)))
    } else {
      return(<section>provide keyword</section>)
    }
  }
  
  const handleLanguages = async (data) => {
    console.log(data)
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
    if(!e.target.value) {setQuery({...query, [e.target.name]: ''})}
    let inputPhrase = e.target.value;
    
    let formattedPhrase = inputPhrase.split(' ').join("+")
    console.log(formattedPhrase)
    setQuery({...query, [e.target.name]: inputPhrase})
  }

  const handleSelectSort = async (e) => {
    e.preventDefault();
    console.log("target " + e.target.value)
    setQuery({...query, [e.target.name]: e.target.value});
    // dispatch(setQueries(query));
    }
    // console.log(query)
    // fetchData()
  // }
    const cleanQueries = () => {
      setQuery({...query,
        language: ''
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
  
useEffect(async() => {
   fetchData()
   await repos
}, [keywords])

useEffect(() => {
  // let infoData = `&q=${keywords}+language:${language}&sort=${sortType}`
   fetchData()
  //  await repos
}, [query])

  return (
    <section className='header-container'>
      <h1>RepoFinder</h1>
      <form className="header-form" autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"keywords"} label="Search..." type="search" />
          <Button type="submit" color="primary">Submit</Button>
      </form>
      {!!repos.items &&
      <>
        <FormControl onSubmit={(e) => handleSubmit(e)}>
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
      <FormControl onSubmit={(e) => handleSubmit(e)}>
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
      </>
      }
    </section>
  )
}

export default HeaderForm;