import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment';
import { Input } from 'antd'

const { TextArea } = Input;

function Comment(props) {
  const videoId = props.videoId

  const user = useSelector(state => state.user)

  const [commentValue, setcommentValue] = useState("");

  const handleClick = (event) => {
    setcommentValue(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      videoId: videoId
    }

    Axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if (response.data.success) {
          //console.log(variables.writer)
          //console.log(response.data.result)
          console.log(variables)
          console.log(videoId)
        } else {
          alert('코멘트를 저장하지 못했습니다')
        }
      })
  }

  return (
    <div>
      <br />
      <p> Replies </p>
      <hr />

      {/* Comment  Lists */}
      {props.commentLists && props.commentLists.map((comment, index) => (
        <SingleComment comment={comment} videoId={videoId} />
      ))}
      
      {/* Root Comment  Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해주세요"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Comment
