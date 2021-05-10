import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Saying from "../components/Saying";

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width: 100%;
  justify-content: center;
  align-items:center;
  align-items:center;
  justify-content:center;
  padding-top: 40px;
`
const TODAY_QUERY = gql`
  query seeSaying($id:Int!){
    seeSaying(id:$id){
      id
      text 
      user{
        name
        email
      }
      author{
        id
        name
      }
      tags{
        id
        name
      }
      totalLikes
      totalComments
      isMine
      isLike
    }
  }
`

function Home(){
  const {data,loading,error} = useQuery(TODAY_QUERY,{
    variables: {
      id:1,
    }
  });
  if(data){
    console.log(data);
  }
  return(
    <Container>
      {data && <Saying {...data.seeSaying} today={true}/>} 
      <button onClick={logUserOut}>logout</button>
    </Container>
  )
}
export default Home;