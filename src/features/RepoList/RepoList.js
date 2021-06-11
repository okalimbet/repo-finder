import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import './RepoList.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import { setUserData } from '../../redux/actions';
import Loading from '../Loading/Loading'
import ErrorPage from '../ErrorPage/ErrorPage';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 300,
    padding: '1em',
    margin: '1em',
    "&:hover": {
      backgroundColor: '#A2E1DB',
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
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const handleRepoClick = (e, repoName, owner) => {
    dispatch(setUserData({
      owner,
      repoName
    }))
  }

  if(error) { return <ErrorPage/> }
  
  if(!repos.items) {
    return null
  } else {
    return(
      <>
        {loading === false ? (
          <section data-cy="repo-list-container" className="repo-list-container">
            <h2>Total Count: {repos.total_count}</h2>
            {
              repos.total_count > 1000 && 
              <p className="message-tip">The search displays only up tp 1,000 results. To help us to narrow down your search please provide us a little more infromation!</p>
            }
            <div className="cards-holder">
              {
                repos.items.map(oneRepo => {
                  return(
                    <Card data-cy="repo-card" key={`card-${oneRepo.id}`} onClick={(e) => handleRepoClick(e, oneRepo.name, oneRepo.owner.login)} className={classes.root}>
                      <CardContent >
                      <Typography className="card-repo-name" noWrap={false} display="inline" variant="h5" component="h3">{oneRepo.name}</Typography>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>{oneRepo.owner.login}</Typography>
                      <div className="stargazing-container">
                        <div className="stargazing-box">
                          <StarIcon data-cy="star-icon"/>
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
          </section> ) : (
            <Loading/>
          )
        }
    </>
    )
  } 
}

export default RepoList;