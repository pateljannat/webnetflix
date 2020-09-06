import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { db, storage } from './firebase';
import firebase from 'firebase';
import "./ImageUpload.css";



function ImageUpload({ userName }) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    console.log(userName)
    const handleUpload = (event) => {
        event.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', (snapshot) => {
            //show progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
            (error) => {
                //Error handling
                console.log(error);
                alert(error.message);
            },
            () => {
                //upload complete
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    //Post image to database
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        userName: userName
                    })
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    return (
        <div className="imageupload">
            {progress ? (
                <progress className="imageupload__progress" value={progress} max="100"></progress>
            ) : ''}
            <input className="imageupload__caption" type="text" placeholder="Enter a caption..." value={caption} onChange={event => setCaption(event.target.value)}></input>
            <div className="imageupload__bottom">
                <input className="imageupload__input" type="file" onChange={handleChange}></input>
                <Button className="imageupload__button" onClick={handleUpload}>Upload</Button>
            </div>

        </div>
    )
}

export default ImageUpload
