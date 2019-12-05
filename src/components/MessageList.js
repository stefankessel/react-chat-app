import React, { Component } from 'react'

import Message from './Message'


export class MessageList extends Component {
    render() {
        if(!this.props.roomId){
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {this.props.msg.map( (msg, i) => {
                    return(
                            <Message key={i} username={msg.senderId} text={msg.text} />
                    )
                })}
            </div>
        )
    }
}

export default MessageList
