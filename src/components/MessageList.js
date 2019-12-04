import React, { Component } from 'react'

import Message from './Message'


export class MessageList extends Component {
    render() {
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
