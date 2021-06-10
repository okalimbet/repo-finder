import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import './RepoList.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import { setUserData } from '../../redux/actions';
 
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    padding: '1em',
    margin: '1em',
    "&:hover": {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
      cursor: 'pointer',
    }
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RepoList = (props) => {

  const classes = useStyles();
  const repos = useSelector(state => state.repos);
  const dispatch = useDispatch();

  const handleRepoClick = (e, repoName, owner) => {
    dispatch(setUserData({
      owner,
      repoName
    }))
  }

  if(!repos.items) {
    return null
  } else {
    return(
      <section className="repo-list-container">
        <h2>Total Count: {repos.total_count}</h2>
        {
          repos.total_count > 1000 && 
          <p className="message-tip">The search provides only up tp 1,000 results. To help us to narrow down your search please provide us a little more infromation!</p>
        }
        <div className="cards-holder">
          {
            repos.items.map(oneRepo => {
              return(
                <Card onClick={(e) => handleRepoClick(e, oneRepo.name, oneRepo.owner.login)} className={classes.root}>
                  <CardContent >
                  <Typography className="card-repo-name" noWrap={false} display="inline" variant="h5" component="h3">{oneRepo.name}</Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>{oneRepo.owner.login}</Typography>
                  <div className="stargazing-container">
                    <div className="stargazing-box">
                      <StarIcon/>
                      <Typography className="small-card-details" variant="body2" component="p">{oneRepo.stargazers_count}</Typography>
                    </div>
                    <Typography className="small-card-details" variant="body2" component="p">{oneRepo.language}</Typography>
                  </div>                 
                  </CardContent>
                </Card>
              )
            })
          }
        </div>
      </section>
    )
  } 
}

export default RepoList;