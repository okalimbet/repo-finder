import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import './SingleRepoPreview.css';
import axios from "axios";
import { baseUrl } from '../../apiCalls'
import { setUserData, fetchBegin, fetchFailure, fetchRepoDataDetails } from '../../redux/actions';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import GitHubIcon from '@material-ui/icons/GitHub';
import StarIcon from '@material-ui/icons/Star';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '94%',
    height: 'fit-content',
    margin: '2em 0',
    padding: '3%'
  },
}));


const SingleRepoPreview = () => {
  const owner = useSelector(state => state.owner);
  const repoName = useSelector(state => state.repoName);
  const repoDetails = useSelector(state => state.repoDetails);
  const classes = useStyles();
  const dispatch = useDispatch();

  const fetchSingleRepo = async (ownerInfo, repoInfo) => {
    if(owner && repoName) {
      dispatch(fetchBegin(true));
      await axios.get(`${baseUrl}repos/${ownerInfo}/${repoInfo}`)
        .then(res =>
          {
            dispatch(fetchRepoDataDetails(res.data))
          }
        )
        .catch(error => dispatch(fetchFailure(error)));
    } else {
      return;
    }
  }

  const handleReturnClick = () => {
    dispatch(setUserData({owner: '', repoName: ''}))
  }

  useEffect(() => {
    if(owner && repoName) {
      fetchSingleRepo(owner, repoName)
    }
    return dispatch(fetchRepoDataDetails(null))
  }, [owner])

  if(repoDetails) {
  return(
    <section className="single-repo-container">
      <div>
        <div className="single-repo-wrapper">
          <h2 className="repo-fullname">{repoDetails.full_name}</h2>
          <Paper className={classes.root} elevation={3}>
              <Typography className="repo-owner"  color="textSecondary" gutterBottom>author: {repoDetails.owner.login}</Typography>
              {repoDetails.description &&
                <Typography className="repo-description" variant="body2" component="p">{repoDetails.description}</Typography>
              }
              <div className="stargazing-container">
                <div className="stargazing-box">
                  <StarIcon/>
                  <Typography className="repo-details" variant="body2" component="p">{repoDetails.stargazers_count}</Typography>
                </div>
                <Typography className="repo-details" variant="body2" component="p">Language: {repoDetails.language}</Typography>
              </div> 
              <div className="github-icon">
                <GitHubIcon/>
              </div>       
          </Paper>
        </div>
        <div className="arrow-back-circle">
          <ArrowBackRoundedIcon onClick={handleReturnClick} className="arrow-back"/>
        </div>
      </div>
    </section>
  )
  } else {
    return null
  }
}

export default SingleRepoPreview;