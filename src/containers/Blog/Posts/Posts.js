import React, {Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import {Link} from 'react-router-dom';
import './Posts.css';



class Posts extends Component {
    state = {
        posts: [],
        //selectedPostId: null
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/' + id});
        //this.setState({selectedPostId: id});
    }

    componentDidMount () {
        console.log (this.props);
        
        axios.get ('/posts')
        .then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map (post=> {
                return {
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({posts: updatedPosts});
            //console.log (response.data);
        })
        .catch(error => {
            console.log (error);
        })
    }


    render() {
        let posts = <p style = {{textAlign: 'center'}}> Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
             return  
                    <Post  
                        title={post.title} 
                        key = {post.id}
                        author = {post.author} 
                        clicked = {() => this.postSelectedHandler(post.id)}/>
                    });
            }
        return (
            <section className="Posts">
               {posts}
           </section>
        )
        
    }



}

export default Posts;