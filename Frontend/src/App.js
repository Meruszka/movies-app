import Main from "./ducks/Main/Main";
import MovieList from "./ducks/UI/movie/MovieList";
import MovieForm from "./ducks/UI/movie/MovieForm";
import MovieDetails from "./ducks/UI/movie/MovieDetails";

import PersonList from "./ducks/UI/person/PersonList";
import PersonForm from "./ducks/UI/person/PersonForm";
import PersonDetails from "./ducks/UI/person/PersonDetails";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Main}/>
          
          <Route exact path='/movies' component={MovieList}/>
          <Route exact path='/movies/add' component={MovieForm}/>
          <Route exact path='/movies/:id' component={MovieDetails}/>
          <Route exact path='/movies/edit/:id' component={MovieForm}/>

          <Route exact path='/persons' component={PersonList}/>
          <Route exact path='/persons/add' component={PersonForm}/>
          <Route exact path='/persons/:id' component={PersonDetails}/>
          <Route exact path='/persons/edit/:id' component={PersonForm}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
