import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends Component {
  render() {
    return (
      <img // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
        src={this.props.path}
        alt={''}
        width={150}
        onClick={this.props.onClick}
      />
    );
  }
}

Image.propTypes = {
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Image.defaultProps = {
  onClick: () => {},
};

export default Image;
