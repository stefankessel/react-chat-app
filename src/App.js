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
      roomId: null,
      msg: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.handleMessage = this.handleMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'Admin',
        tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser

        this.getRooms()        
    })
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch( err => console.log('joinableRooms error'))
  }

  subscribeToRoom(roomId){
    this.setState({msg:[]})
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
          onMessage: message => {
              this.setState({ msg: [...this.state.msg, message]})
          }
      }
      })
      .then( room =>{
        this.setState({roomId: roomId})
        this.getRooms()
      })
  }

  handleMessage(text){
      this.currentUser.sendMessage({
        text,
        roomId: this.state.roomId
      })
  }

  createRoom(name){
    this.currentUser.createRoom({
      name
    })
    .then( room => this.subscribeToRoom(room.id))
  }

  render(){
  return (
    <div className="app">
      <RoomList
              roomId={this.state.roomId} 
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
              subscribeToRoom={this.subscribeToRoom}  />
      <MessageList 
              msg={this.state.msg}
              roomId={this.state.roomId}  />
      <SendMessageForm 
              handleMessage={this.handleMessage}
              disabled ={ !this.state.roomId}  />
      <NewRoomForm createRoom={this.createRoom} />
    </div>
  );
  }
}

export default App;
