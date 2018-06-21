import React from 'react';
import MdHighlightRemove from 'react-icons/lib/md/highlight-remove';
import './Tag.css';
// import PropTypes from 'prop-types'; 

const Tag = (props) => {
    // const { tagColor } = this.props;
    return (
        <div className='tag' >
            <MdHighlightRemove className='tag-remove-icon' onClick={() => props.deleteTag(props.name)}/>
            <div className='tag-text-div'>{props.name}</div>
        </div>
    );
};
Tag.defaultProps = {
    tagColor: 'transparent'
}
export default Tag;