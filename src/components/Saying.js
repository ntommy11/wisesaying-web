import { useMutation } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import {faHeart as faSolidHeart} from '@fortawesome/free-solid-svg-icons';
import {faComment as faSolidComment} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag"
import { useState } from "react";
import styled from "styled-components";
import Comments from './Comments';

const TOGGLE_LIKE = gql`
  mutation toggleLike($id:Int!){
    toggleLike(id: $id){
      ok
      error 
    }
  }
`
const TagWrapper = styled.div`
  margin-left: 5px;
  background-color: #ededed;
  padding: 3px 5px;
  border-radius: 10px;
  font-size: 12px;
  color: #676767;
  margin-bottom: 10px;
`
function Tag({name}){
  return(
    <TagWrapper>
      <span>{name}</span>
    </TagWrapper>
  )
}
function Today({darkmode}){
  return(
    <div style={{
      borderRadius: 10,
      borderWidth: "1px",
      borderColor: "Black",
      backgroundColor: "#ededed",
      paddingInline: 5,
      paddingBlock: 3,
      color: "#787878",
      fontSize: 12,
    }}>
      <span>오늘의 말</span>
    </div>
  )
}

export default function Saying({id, user, text, tags, author, isLike, isMine, totalLikes, totalComments, today, refresh}){
  const [openComments, setOpenComments] = useState(false);
  //console.log(refresh);
  // 텍스트 전처리
  console.log(author);
  console.log(text);
  const textlen = text.length;
  let fontSize = 0;
  if (textlen < 50){
    fontSize = 18;
  }else if(textlen < 100){
    fontSize = 16;
  }else{
    fontSize = 14;
  }
  //console.log("textlen:",textlen);
  let sentences = text.split('.');
  if(sentences[sentences.length-1]=="") sentences.pop();
  
  //console.log(sentences);

  console.log(id,text);
  //const {id, user, text, tags, author, isLike, isMine, totalLikes, totalComments} = data.seeSaying;
  //console.log("data:",data)


  const [toggleLike] = useMutation(TOGGLE_LIKE,{
    variables:{
      id,
    },
    update: (cache, { data:{toggleLike:{ok}}})=>{
      console.log("ok=",ok);
      if(ok){
        const target = `Saying:${id}`; // 수정할 대상을 지정
        cache.modify({
          id: target,
          fields:{
            isLike(prev){
              return !prev;
            },
            totalLikes(prev){
              if (isLike) return prev-1;
              else return prev+1;
            },
          },
        });
      }
    },
    onCompleted:(data)=>console.log(data),
  });
  return(
    <Container>
      <Header>
        {today&&<Today/>}
      </Header>
      <TextBody>
        <TextContent>
          {
            sentences.map((text,index)=><Text key={index} >{text.trim()}.{"\n"}</Text>)
          }
        </TextContent>
        <TextAuthor>
          {author.name}
        </TextAuthor>
      </TextBody>
      <Footer>
        <Action onClick={toggleLike}>
          <FontAwesomeIcon style={{color:isLike?"tomato":"inherit"}} size={"lg"} icon={isLike? faSolidHeart:faHeart}/>
          {totalLikes}
        </Action>
        <Action onClick={()=>setOpenComments(!openComments)}>
          <FontAwesomeIcon icon={openComments?faSolidComment:faComment} size={"lg"}/>
          {totalComments}
        </Action>
        {
          tags.map((item,index)=><Tag key={index} {...item}/>)
        }
      </Footer>
      {openComments&&<Comments sid={id}/>}
    </Container>
  )
}

const Action = styled.span`
  width: 20px;
  /*border: 1px dashed gray;*/
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction:column;
  padding: 0px 12px;
  cursor: pointer;
`

const Footer = styled.div`
  align-items:center;
  padding: 10px 10px;
  display: flex;
  /*border: 1px dashed gray;*/
`

const Header = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.div`
  padding: 5px;
`

const TextContent = styled.div`
  font-weight: bold;
`
const TextAuthor = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #cbcbcb;
  color: #787878;
  font-size: 12px;
`
const TextBody = styled.div`
  padding: 20px;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  align-items: center;
  justify-content: center;
  border: 1px solid blueviolet;
  width: 350px;
  border-radius: 15px;
  margin: 10px 0px;
  min-height: 250px;
  overflow: hidden;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
  background-color: white;
`