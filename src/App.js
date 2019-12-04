import React from 'react';
import Chatkit from '@pusher/chatkit-client'
import './App.css';

import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import {instanceLocator, tokenUrl} from './config'

class App extends React.Component {
  constructor(){
    super()
    this.state= {
      msg: []
    }
    this.handleMessage = this.handleMessage.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: '123456',
        tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser
        currentUser.subscribeToRoom({
            roomId: '2fcf80ab-1c94-4a5b-bfb5-d6543ee569ad',
            hooks: {
                onMessage: message => {
                    this.setState({ msg: [...this.state.msg, message]})
                }
            }
        })
    })
  }

  handleMessage(text){
      this.currentUser.sendMessage({
        text,
        roomId: '2fcf80ab-1c94-4a5b-bfb5-d6543ee569ad',
      })
  }

  render(){
  return (
    <div className="app">
      <RoomList />
      <MessageList msg={this.state.msg}/>
      <SendMessageForm handleMessage={this.handleMessage}/>
      <NewRoomForm />
    </div>
  );
  }
}

export default App;
