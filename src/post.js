import React, { useState, useEffect } from 'react';
import "./post.css"
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from "firebase"

function Post({ postId, userName, caption, imageUrl, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    const handleSubmit = (e) => {
        //logic to submit comment
        e.preventDefault();

        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                text: comment,
                userName: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setComment('');
    }
    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt="Jannat" src="/static/images/avatar/1.jpg" ></Avatar>
                <h3>{userName}</h3>
            </div>
            <img className="post__image" alt={userName} src={imageUrl}></img>
            <h4 className="post__text"><strong> {userName}: </strong> {caption} </h4>
            <div className="post__comments">
                {
                    comments.map(({ id, text, userName }) => (
                        <p>
                            <strong>{userName}</strong> {text}
                        </p>

                    ))
                }
            </div>
            {user && (
                <form className="post__commentBox">
                    <input className="post__input" placeholder="Add a comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                    <button disabled={!comment} className="post__button" onClick={handleSubmit} type="submit">Post</button>
                </form>
            )}
        </div>
    )
}

export default Post