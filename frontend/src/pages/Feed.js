import React, { Component } from 'react';
import api from '../services/api.js';
import './Feed.css'

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import send from '../assets/send.svg';
import comment from '../assets/comment.svg';

class Feed extends Component{
    state = {
        feed: [],
    };

    async componentDidMount(){
        const response = await api.get('posts');

        this.setState({ feed: response.data  }); 

        console.log(this.state.feed);    
        console.log('AKA');
    }

    render() {
        return(
            <section id='post-list'>
                { this.state.feed.map( post => (
                    <article>
                        <header>
                            <div className='user-info'>
                                <span>{post.author}</span>
                                <span className='place'>{post.place}</span>
                            </div>

                            <img src={more} alt='Mais'/>
                        </header>

                            <img src={`http://localhost:3333/files/${post.image}`} alt=''/>

                        <footer>
                            <div className='actions'>
                                <img src={like} alt=''/>
                                <img src={comment} alt=''/>
                                <img src={send} alt=''/>
                            </div>

                            <strong>{post.likes} curtidas</strong>

                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                ) )}
            </section>
        );
    }
}

export default Feed;