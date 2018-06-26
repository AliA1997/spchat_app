import React, { Component } from 'react';
import './Slideshow.css';

export default class Slideshow extends Component {
    render() {
        return (
            <div className='slideshow'>
                {this.props.slides && this.props.slides.map(slide => <div className='slide'> 
                                                                        <img src={slide.imageurl} alt={slide.title} />
                                                                        <h3>{slide.title}</h3>
                                                                    </div>)}
            </div>
        );
    }
}