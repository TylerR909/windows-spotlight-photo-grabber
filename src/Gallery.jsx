import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from './components/Image';

class Gallery extends Component {
  render() {
    return (
      <div>
        { this.props.images.map(img => (
          <Image
            key={img.path}
            path={img.path}
            onClick={() => console.log(img.path)}
          />
          ))
        }
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    }),
  ).isRequired,
};

export default Gallery;
