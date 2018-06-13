import React, {Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import './Posts.css';



class Posts extends Component {
    state = {
        posts: [],
        //selectedPostId: null
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
        //this.setState({selectedPostId: id});
    }

    loadData() {
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

    componentDidMount () {
        console.log (this.props);
        this.loadData();
        
    }

    // componentDidUpdate() {
    //     this.loadData();
    // }

    render() {
        let posts = <p style = {{textAlign: 'center'}}> Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
             return   <Post  
                        title={post.title} 
                        key = {post.id}
                        author = {post.author} 
                        clicked = {() => this.postSelectedHandler(post.id)}/>
                    });
            }
        console.log (this.props.match.url);
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component = {FullPost} />
           </div>
        )
        
    }



}

export default Posts;