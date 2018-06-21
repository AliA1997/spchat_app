import React, {Component} from 'react';
import './Slideshow.css';

var hasOwn = {}.hasOwnProperty;

function classNames () {
  var classes = '';

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes += ' ' + arg;
    } else if (Array.isArray(arg)) {
      classes += ' ' + classNames.apply(null, arg);
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes += ' ' + key;
        }
      }
    }
  }

  return classes.substr(1);
}

export default class Slideshow extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        activeIndex: 0,
    };
  }
  componentDidMount() {
    const { slides } = this.props;
    if(slides) this.setState({activeIndex: (this.state.activeIndex + 1) >  slides.length ? 0 : this.state.activeIndex + 1});
  }
  jumpToSlide(index) {
    this.setState({ activeIndex: index });
  }
  goToArticle(link) {
    window.open(link, '_blank');
  }
  render() {
    console.log(this.props.slides);
    const inHome = window.location.href === 'http://localhost:3000/' ? true : false;
    return (
      <div className="slideshow">
        <ul className="slideshow-slides">
          { this.props.slides &&
            this.props.slides.map((slide, index) => (
              <li key={index} className={ classNames({ active: index === this.state.activeIndex }) }>
                <figure className='slide-figure' onClick={() => inHome ? null : this.goToArticle(slide.link)}>
                  <img src={ slide.imageurl } alt={slide.title} className='slide-image'/>
                  { slide.title ? <figcaption>{ slide.title }</figcaption> : null }
                </figure>
              </li>
            ))
          }
        </ul>
        <ul className="slideshow-dots">
          { this.props.slides &&
            this.props.slides.map((slide, index) => (
              <li key={index} className={ (index === this.state.activeIndex) ? 'active': '' }>
                <a onClick={ (event)=> this.jumpToSlide(index) }>{ index + 1 }</a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

