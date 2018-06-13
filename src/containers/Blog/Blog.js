import React, { Component } from 'react';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent( () => {
    return import('./NewPost/NewPost');
})

class Blog extends Component {
    state = {
        auth: true
    }

    render () {

        return (
            <div className ="Blog">
                <header> 
                    <nav>
                        <ul>
                            <li><NavLink 
                                activeClassName = "my-active"
                                activeStyle ={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}
                                to="/posts/" 
                                exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                    pathname: "/new-post",
                                    hash:'#submit',
                                    search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>                            
                </header>
                {/* <Route path="/" exact render = {() => <Posts />} /> */}
                <Switch>
                    {this.state.auth ? <Route path = "/new-post" component = {AsyncNewPost}/> : null }
                    <Route path = "/posts/" component={Posts}/>
                    <Route render ={() =><h1>Not Found </h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path = "/" component={Posts}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;