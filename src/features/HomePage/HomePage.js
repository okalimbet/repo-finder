import HeaderForm from '../HeaderForm/HeaderForm'
import RepoList from '../RepoList/RepoList'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const HomePage = (props) => {

  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const [reposList, setReposList] = useState(null)

  useEffect( async ()=> {
    await repos;
  }, [repos])
  return(
    <section>
      <HeaderForm/>
    {/* {reposList && */}
    <RepoList/>
    {/* } */}
    </section>
  )
}

export default HomePage;