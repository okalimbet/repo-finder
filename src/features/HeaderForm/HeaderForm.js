import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {fetchBegin, fetchFailure, fetchRepoData, setQueries} from '../../redux/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const HeaderForm = () => {
  const [query, setQuery] = useState({
    language: '',
    page: '',
    keywords: '',
    sortType: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault()
    setQuery({...query, [e.target.name]: e.target.value})
  }

  const handleSortChange = (e) => {
    e.preventDefault()
    setQuery({...query, sortType: e.target.value})
    dispatch(setQueries(query))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("I ma")
    dispatch(setQueries(query))
  }

  return (
    <section className='header-container'>
      <h1>RepoFinder</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"keywords"} label="Search..." type="search" />
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"language"} label="Language..." type="search" />
          <TextField id="standard-search" onChange={(e) => handleChange(e)} name={"page"} label="Page..." type="search" />
          <Button type="submit" color="primary">Submit</Button>
      </form>
    </section>
  )
}

export default HeaderForm;