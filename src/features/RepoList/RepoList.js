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
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const [reposList, setReposList] = useState(null)
  const keywords = useSelector(state => state.keywords);
  const language = useSelector(state => state.language);
  const sortType = useSelector(state => state.sortType);

useEffect( async ()=> {
  await repos;
}, [repos])

  if(!repos.items) {
    return null
  } else {
    console.log(repos)
    return(
      <section className="repo-list-container">
        <h2>Total Count: {repos['total_count']}</h2>
        <div className="cards-holder">
          {
            repos.items.map(oneRepo => {
              return(
                <Card className={classes.root}>
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