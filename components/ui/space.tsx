import React from 'react';
import PropTypes from 'prop-types'; // For type checking props

const Spacer = ({ width, height }) => {
  const style = {
    display: 'block', // Ensures it takes up its own space
  };

  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
    style.flexShrink = 0; // Prevent shrinking in a flex container
  }

  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
    style.flexShrink = 0; // Prevent shrinking in a flex container
  }

  return <div style={style} />;
};

Spacer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Spacer.defaultProps = {
  width: undefined,
  height: undefined,
};

export default Spacer;