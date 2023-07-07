import React from 'react';
import { Button } from 'reactstrap';
const ShareButton = ({ url }) => {
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({ url })
        .then(() => console.log('Link shared successfully.'))
        .catch((error) => console.log('Error sharing link:', error));
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };

  return (
    <Button color="primary" onClick={handleShareClick}>Copy Link</Button>
  );
};

export default ShareButton;
