import React from 'react'

export default function Message(props) {
    return (
        <div className="message">
            <p className="message-username">{props.username}</p> 
            <p className="message-text">{props.text}</p>
        </div>
    )
}
