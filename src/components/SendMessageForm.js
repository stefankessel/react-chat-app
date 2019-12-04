import React, { Component } from 'react'

export default class SendMessageForm extends Component {
    constructor(){
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        let {value} = e.target
        this.setState({message: value})   
    }

    handleSubmit(e){
        this.props.handleMessage(this.state.message)
        this.setState({message: ''})
        e.preventDefault()
    }

    render() {
        return (
            <>
            <form className="send-message-form" onSubmit={this.handleSubmit}>
                <input placeholder="Send Message" type="text" onChange={this.handleChange} value={this.state.message}/>
            </form>
            </>
        )
    }
}
