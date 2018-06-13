import React, { Component } from 'react';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import NewPost from './NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    

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
                    <Route path = "/new-post" component = {NewPost}/>
                    <Route path = "/posts/" component={Posts}/>
                    <Redirect from="/" to="/posts" />
                    {/* <Route path = "/" component={Posts}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;