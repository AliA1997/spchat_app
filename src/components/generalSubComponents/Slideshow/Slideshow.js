import React, { Component } from 'react';
import './Slideshow.css';

export default class Slideshow extends Component {
    constructor() {
        super();
        this.state = {
            slideIndex: 0
        }
    }
    plusSlides() {
        if(this.state.slideIndex + 1 > 4) return this.setState({slideIndex: 0});
        this.setState({slideIndex: this.state.slideIndex + 1})
        // this.showSlides(this.state.slideIndex);
    }
    minusSlides() {
        if(this.state.slideIndex - 1 < 0) return this.setState({slideIndex: 4});
        this.setState({slideIndex: this.state.slideIndex - 1});
        // this.showSlides(this.state.slideIndex);
    }
    currentSlide(n) {
        this.setState({slideIndex: n});
    }
    showSlides(n) {
        // let i;
        // const { slides} = this.props;
        // const { slideIndex } = this.state;
        // let slidesImgs = document.getElementsByClassName('mySlides');
        // let dots = document.getElementsByClassName('demo');
        // let captionText = document.getElementsByClassName('caption');
        if(this.state.slideIndex > 4) this.setState({slideIndex: 0});
        if(this.state.slideIndex < 4) this.setState({slideIndex: n});
    }
    render() {
        const { slideIndex } = this.state;
        const { slides } = this.props;
        console.log('slides---------------', slides);
        return (
            <div className="container" style={{margin: '5%'}}>
                {slides.map((slide, i) => 
                <div className="mySlides" key={i} style={{display: slideIndex === i ? 'block' : 'none', width: '100%', height: "100%"}}>
                    <div className={slideIndex === this.key ? "numbertext active" : "numbertext"}></div>
                    <img src={slide.imageurl} style={{width: "100%"}} alt={slide.title}
                    onClick={() => this.props.linkFunc(slide.link)}/>
                    <div className="caption-container" >
                        <p id="caption">{slide.title}</p>
                     </div>
                </div>)}
            
              <a className="prev" onClick={() => this.minusSlides()}>&#10094;</a>
              <a className="next" onClick={() => this.plusSlides()}>&#10095;</a>
            

            
                <div className="row" style={{margin: "30px"}}>
                    {slides.map((slide, i) => <div className="column" key={i}>
                                                <img className="demo cursor"
                                                src={slide.imageurl} 
                                                style={{width: "100%"}} 
                                                onClick={() => this.currentSlide(i)} alt="The Woods"/>
                                             </div>)}
              </div>
            </div>
        );
    }
}

// Slideshow.defaultProps = {
//     isHome: false
// }