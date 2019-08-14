import React, { Component } from 'react';
import './Feed.css'

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import send from '../assets/send.svg';
import comment from '../assets/comment.svg';

class Feed extends Component{
    render() {
        return(
            <section id='post-list'>
                <article>
                    <header>
                        <div className='user-info'>
                            <span>Heron Rodrigues</span>
                            <span className='place'>Brasília</span>
                        </div>

                        <img src={more} alt='Mais'/>
                    </header>

                        <img src='http://localhost:3333/files/maracana-flamengo.jpg'/>

                    <footer>
                        <div className='actions'>
                            <img src={like} alt=''/>
                            <img src={comment} alt=''/>
                            <img src={send} alt=''/>
                        </div>

                        <strong>100 curtidas</strong>

                        <p>
                            Post daora
                            <span>#daora</span>
                        </p>
                    </footer>
                </article>

                <article>
                    <header>
                        <div className='user-info'>
                            <span>Heron Rodrigues</span>
                            <span className='place'>Brasília</span>
                        </div>

                        <img src={more} alt='Mais'/>
                    </header>

                        <img src='http://localhost:3333/files/maracana-flamengo.jpg'/>

                    <footer>
                        <div className='actions'>
                            <img src={like} alt=''/>
                            <img src={comment} alt=''/>
                            <img src={send} alt=''/>
                        </div>

                        <strong>100 curtidas</strong>

                        <p>
                            Post daora
                            <span>#daora</span>
                        </p>
                    </footer>
                </article>
            </section>
        );
    }
}

export default Feed;