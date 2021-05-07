
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { isLoggedInVar, darkModeVar, client } from './apollo';
import Layout from './components/shared/Layout';
import routes from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import SignUp from './screens/SignUp';
import { darkTheme, GlobalStyles, lightTheme } from './styles';


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log("isLoggedIn:",isLoggedIn);
  const darkmode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkmode? darkTheme:lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {
                  isLoggedIn?
                  <Layout>
                    <Home />
                  </Layout> 
                  :
                  <Login />
                }
              </Route>
              {!isLoggedIn?(
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
              ): null}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

// Switch : one route at a time
// url:login --router searched-> component:Login
export default App;
