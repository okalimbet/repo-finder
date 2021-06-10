import HeaderForm from '../HeaderForm/HeaderForm'
import RepoList from '../RepoList/RepoList'
import SingleRepoPreview from '../SingleRepoPreview/SingleRepoPreview'
import { useSelector } from "react-redux";
import './HomePage.css'

const HomePage = (props) => {
  const owner = useSelector(state => state.repos);
  const repoName = useSelector(state => state.repos);
  const repoDetails = useSelector(state => state.repoDetails);

  return(
    <section className="homepage-container">
      {(!repoDetails) &&
      <>
        <HeaderForm/>
        <RepoList/>
      </>
      }
      {owner && repoName &&
        <SingleRepoPreview/>
      }
    </section>
  )
}

export default HomePage;