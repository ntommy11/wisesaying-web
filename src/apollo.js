import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'

const TOKEN = "token";

export const tokenVar = makeVar("");
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN))); // Reactive variable!
export const logUserIn = (token)=>{
  localStorage.setItem(TOKEN,token);
  isLoggedInVar(true);
}
export const logUserOut = ()=>{
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
}
const DARK_MODE = "DARK_MODE";

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkmode = ()=>{
  localStorage.setItem(DARK_MODE,"true");
  darkModeVar(true);
}

export const disableDarkmode = ()=>{
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
}

const httpLink = createHttpLink({
  uri: "http://54.180.106.241:4000/graphql",
});

const authLink = setContext((_, {headers})=>{
  return {
    headers:{
      ...headers,
      authorization: localStorage.getItem(TOKEN),
    }
  }
})

const deduplicate = (array)=>{
  let unique__ref = [];
  let res = [];
  array.forEach((obj)=>{
    if(!unique__ref.includes(obj.__ref)){
      unique__ref.push(obj.__ref);
      res.push(obj);
    }
  });
  return res;
}

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          seeTagSaying:{
            keyArgs:['id'],
            merge(existing=[],incomming){
              return deduplicate([...existing,...incomming]);
            }
          },
          seeAuthorSaying:{
            keyArgs:['id'],
            merge(existing=[],incomming){
              return deduplicate([...existing,...incomming]);
            }
          },
        }
      }
    }
  }),
  connectToDevTools: true,
});

