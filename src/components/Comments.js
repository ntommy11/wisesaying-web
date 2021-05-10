import { useMutation, useQuery } from "@apollo/client"
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import gql from "graphql-tag"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"

const CREATE_COMMENT = gql`
  mutation createComment($sayingId: Int!, $text: String!){
    createComment(sayingId: $sayingId, text:$text){
      ok
      error
    }
  }
`
const DELETE_COMMENT = gql`
  mutation deleteComment($id:Int!){
    deleteComment(id:$id){
      ok
      error 
    }
  }
`

const SEE_COMMENT = gql`
  query seeSayingComment($id:Int!, $take: Int!, $lastId:Int){
    seeSayingComment(id:$id, take:$take, lastId:$lastId){
      id
      createdAt 
      text 
      isMine 
      user{
        id
        name
        email
      }
    }
  }

`
function Comment({sid,id,text,isMine,user,createdAt}){
  const time  = new Date(Number(createdAt));
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const year = time.getFullYear();
  const date = time.getDate();
  const month = time.getMonth()+1;

  const [deleteComment] = useMutation(DELETE_COMMENT,{
    variables:{
      id,
    },
    update:(cache,res)=>{
      const {data:{deleteComment:{ok}}} = res;
      if(ok){
        cache.evict(
          {
            id: `Comment:${id}`
          }
        );
        cache.modify({
          id: `Saying:${sid}`,
          fields:{
            totalComments(prev){
              return prev-1;
            }
          }
        })
      }
    }
  });
  const onDeleteClick = ()=>{deleteComment();}
  return(
    <CommentContainer>
      <CommentHeader>
        <CommentHeaderLeft>
          <CommentAuthor>{user.name} </CommentAuthor>
          {/*<FontAwesomeIcon icon={faChevronRight} size={"xs"}/>*/}
          {/*<CommentTime>{year}.{month}.{date}  {hours>=10?hours:`0${hours}`}:{minutes>=10?minutes:`0${minutes}`}</CommentTime>*/}
        </CommentHeaderLeft>
        {isMine&&<CommentDelete onClick={onDeleteClick}><FontAwesomeIcon icon={faTimesCircle}/></CommentDelete>}
      </CommentHeader>
      <CommentText>{text}</CommentText>
    </CommentContainer>
  )
}

const CommentDelete = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: #bcbcbc;
`

const CommentTime = styled.span`
  font-size: 12px;
  color: #bcbcbc;
  font-weight: 100;
`

const CommentHeader = styled.div`
  display:flex;
  justify-content:space-between;
  margin-bottom: 3px;
`
const CommentHeaderLeft = styled.span`
  flex-direction:row;
  align-items:center;
`
const CommentContainer = styled.div`
  margin-top: 5px;
  padding: 3px;
  border-top: 1px solid #dedede;
  margin-inline: 10px;

`
const CommentAuthor = styled.span`
  font-weight: 800;
`

const CommentText = styled.span`
`
export default function Comments({sid}){
  const [createComment,{loading}] = useMutation(CREATE_COMMENT,{
    onCompleted:(data)=>{
      console.log(data);
      setValue("text", "");
      refetch();
    },
  });
  const {data,error, refetch} = useQuery(SEE_COMMENT,{
    variables:{
      id:sid,
      take: 10,
    }
  });

  const { register, handleSubmit, setValue, getValues} = useForm();
  const onValid = ({text})=>{
    if(loading){
      return;
    }
    createComment({
      variables:{
        sayingId:sid,
        text:text,
      },
      update:(cache,{data:{createComment:ok}})=>{
        if(ok){
          cache.modify({
            id: `Saying:${sid}`,
            fields:{
              totalComments(prev){
                return prev+1;
              }
            }
          })
        }
      }
    });
  }
  if(data){
    const comments = data.seeSayingComment;
    return(
      <Container>
        {
          comments.map(comment=><Comment sid={sid} {...comment}/>)
        }
        <Form>
          <form onSubmit={handleSubmit(onValid)}>
            <input name="text" {...register('text',{required:true})} type="text" placeholder="Write a comment..." />
          </form>
        </Form>
      </Container>
    )
  }
  return <div></div>
}

const Container = styled.div`
  padding: 10px 5px;
`
const Form = styled.div`
  border-top: 1px solid #dedede;
  padding-top: 10px;
  margin-top: 10px;
  background-color:#efefef;
  padding: 7px;
  border-radius: 15px;
  margin-inline: 5px;
  margin-bottom: 0px;
`