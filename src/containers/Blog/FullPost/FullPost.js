import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    loadData () {
        const id = this.props.match.params.id;

        if(id) {
            if (this.state.loadedPost){
                console.log (id, this.state.loadedPost.id);
                console.log ("id", typeof id);
                console.log ("this.state.loadedPost.id", typeof this.state.loadedPost.id);

            }
            // the + converts the string to a number:
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +id)) {
                axios.get(`/posts/${id}`)
                .then (response => {
                    this.setState({loadedPost: response.data});
                    //console.log (response);
                })
            }
        }
    }
    componentDidUpdate() {
        this.loadData();
    }

    componentDidMount () {
        console.log (this.props);
        this.loadData();
    }

    deletePostHandler = () => {
        console.log ("delete Post: ", this.props.match.params.id);
        axios.delete(`/posts/${this.props.match.params.id}`)
            .then(response=> {
                console.log (response);
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick = {this.deletePostHandler} >Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;