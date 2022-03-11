import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { Input } from 'antd'
import { OmitProps } from 'antd/lib/transfer/renderListBody';

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
          props.refreshFunction(response.data.result)
          setcommentValue("")
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
        (!comment.responseTo &&
          <React.Fragment>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={videoId} />
            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} videoId={videoId} commentLists={props.commentLists} />
          </React.Fragment>
        )
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
