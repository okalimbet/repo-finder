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
const [btnDisabled, setBtnDisabled] = useState(true)
const [queryInfo, setQueryInfo] = useState()

  const dispatch = useDispatch();
  const keywords = useSelector(state => state.keywords);
  const language = useSelector(state => state.language);
  const validateQuery = () => {
    let info = {}
      info.keywords=`&q=${query.keywords}` || ``;
      info.language = `+language:${query.language}` || ``;
      info.sortType = `&sort=${query.keywords}` || ``;
    setQueryInfo(info)
  }

  const fetchData = async () => {
    let results = []
    if(keywords) {
    results = Object.values(queryInfo).join('')

    dispatch(fetchBegin());
    await axios.get(`https://api.github.com/search/repositories?&order=desc${results}`)
      .then(handleErrors)
      .then(res => dispatch(fetchRepoData(res.data))
      ).catch(error => dispatch(fetchFailure(error)))
    // }
    } else {
      return(<section>provide keyword</section>)
    }
  }
  
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  const handleChange = (e) => {
    e.preventDefault()
    let inputPhrase = e.target.value;
    let formattedPhrase = inputPhrase.split(' ').join("+")
    console.log(formattedPhrase)
    setQuery({...query, [e.target.name]: e.target.value})
    if(e.target.name === "keywords") {
      setBtnDisabled(!e.target.value)
    }
  }

  const handleSortChange = (e) => {
    e.preventDefault()
    setQuery({...query, sortType: e.target.value})
    dispatch(setQueries(query))
    // validateQuery()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("I ma")
    dispatch(setQueries(query))
    validateQuery()
    fetchData()
  }

  return (
    <section className='header-container'>
      <h1>RepoFinder</h1>
      <form className="header-form" onSubmit={(e) => handleSubmit(e)}>
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"keywords"} label="Search..." type="search" />
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"language"} label="Language..." type="search" />
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"page"} label="Page..." type="search" />
          <Button disabled={btnDisabled} type="submit" color="primary">Submit</Button>
      </form>
      <FormControl onSubmit={(e) => handleSubmit(e)}>
        <InputLabel id="sort"></InputLabel>
        <Select
          labelId="sort"
          id="sort"
          displayEmpty
          value={query.sortType}
          onChange={(e) => handleSortChange(e)}
        >
          <MenuItem value="">
            <em>Best Match</em>
          </MenuItem>
          <MenuItem value={"stars"}>Stars</MenuItem>
        </Select>
        <FormHelperText>Sort By</FormHelperText>
      </FormControl>
    </section>
  )
}

export default HeaderForm;