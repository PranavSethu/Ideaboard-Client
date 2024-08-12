import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const UserCapture = () => {
    const videoRef = useRef(null);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState({ lat: null, long: null });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            },
            err => console.error('Error getting location', err)
        );

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing the webcam:', err);
            });
    }, []);

    const captureImage = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/png'));
    };

    // const handleSubmit = async () => {
    //     if (!image || !location.lat || !location.long) {
    //         alert('Image or location data is missing!');
    //         return;
    //     }

    //     try {
    //         await axios.post('http://localhost:3002/api/v1/attendance/mark', {
    //             image,
    //             location
    //         });
    //         alert('Attendance marked successfully');
    //     } catch (error) {
    //         console.error('Error marking attendance:', error);
    //         alert('Failed to mark attendance');
    //     }
    // };
    const handleSubmit = async () => {
        if (!image || !location.lat || !location.long) {
            alert('Image or location data is missing!');
            return;
        }
    
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found, please login first.');
            return;
        }
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    
        try {
            await axios.post('http://localhost:3002/api/v1/attendance/mark', {
                image,
                location
            }, config);
            alert('Attendance marked successfully');
        } catch (error) {
            console.error('Error marking attendance:', error);
            alert('Failed to mark attendance');
        }
    };
    

    return (
        <div>
            <h1>Capture Your Image</h1>
            <video ref={videoRef} width="640" height="480" autoPlay muted></video>
            <button onClick={captureImage}>Capture Image</button>
            {image && (
                <>
                    <img src={image} alt="Captured" style={{ width: '640px', height: '480px' }} />
                    <button onClick={handleSubmit}>Submit Attendance</button>
                </>
            )}
            <div>
                <h2>Location Data:</h2>
                <p>Latitude: {location.lat}</p>
                <p>Longitude: {location.long}</p>
            </div>
        </div>
    );
};

export default UserCapture;
