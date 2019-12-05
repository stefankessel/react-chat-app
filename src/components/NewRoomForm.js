import React from 'react'

class NewRoomForm extends React.Component {
    constructor(){
        super()
        this.state= {
            roomName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        const {value} = e.target
        this.setState({roomName: value})
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.createRoom(this.state.roomName)
        this.setState({roomName: ''})
    }

    render () {
        return (
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Enter new Room" 
                        required />
                    <button id="create-room-btn" type="submit">+</button>
            </form>
        </div>
        )
    }
}

export default NewRoomForm