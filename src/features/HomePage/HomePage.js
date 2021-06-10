import HeaderForm from '../HeaderForm/HeaderForm'
import RepoList from '../RepoList/RepoList'

const HomePage = (props) => {

  return(
    <section className="homepage-container">
      <HeaderForm/>
      <RepoList/>
    </section>
  )
}

export default HomePage;