import React, { Component } from 'react'

export class RoomList extends Component {

    render() {
        const sortedList = [...this.props.rooms].sort((a,b) => a.id -b.id)
        return (
            <div className="rooms-list">
                <ul>
                    <h3>Your Rooms</h3>
                    {sortedList.map( (room) => {
                        const active = (this.props.roomId === room.id) ? 'active' : ''
                       return <li 
                                    key={room.id}  
                                    className={"room " + active} >
                                <a 
                                    href="#"
                                    onClick={ () => this.props.subscribeToRoom(room.id)} >
                                    # {room.name}
                                </a>
                            </li>
                    
                })}
                </ul>
            </div>
        )
    }
}

export default RoomList
