import React from 'react';
import ReactLoading from 'react-loading';
import Particles from 'react-particles-js';
import backgroundParams from '../../../background-particles.json';
import './Loader.css';

const Loader = (props) => {
    const { isSmall } = props;
    return (
        <div>
            <Particles params={backgroundParams} className='particles-loader' height='100%' width='100%' />
            {/* <div className='loading-background'> */}
                <ReactLoading color='#fff' className={isSmall ? 'small-loader' : 'loader'}
                    type='bars' height={isSmall ? 150 : 400} width={isSmall ? 150 : 400}/>
            {/* </div> */}
        </div>
    );
};

Loader.defaultProps = {
    isSmall: false
}

export default Loader;