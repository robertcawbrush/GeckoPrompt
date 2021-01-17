import GeckoCalender from './components/GeckoCalender';
import DataGraph from './components/graphs/DataGraph';
import PageNotFound from './components/common/PageNotFound';
import Header from './components/common/Header';

import { Route, Switch } from 'react-router-dom';

function App() {
  
  return (
	  <>
		 <Header></Header>
		  <Switch>
			  <Route path="/" exact component={GeckoCalender}></Route>
			  <Route path="/datagraph" component={DataGraph}></Route>
			  <Route component={PageNotFound}></Route>
		  </Switch>
	  </>
  );
}

export default App;
