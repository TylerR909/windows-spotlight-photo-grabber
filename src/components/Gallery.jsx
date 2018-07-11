import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

class Gallery extends Component {
  render() {
    return (
      <div>
        { this.props.images.map(img => (
          <Image
            key={img.path}
            path={img.path}
            onClick={() => this.props.onItemPress(img.path)}
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
  onItemPress: PropTypes.func.isRequired,
};

export default Gallery;
