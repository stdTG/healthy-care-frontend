import React from 'react';

import AddButton from 'components/Buttons/AddButton';

const UploadButton = ({ onChange, title }) => {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: 'none' }}
        onChange={onChange}
        name="upload-photo"
        id="upload-photo"
        type="file"
      />
      <AddButton fullWidth component="span" title={title} type="submit" />
    </label>
  );
};
export default UploadButton;
