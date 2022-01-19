import React, { useMemo, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import { IconButton } from 'components/ui';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  photo: {
    cursor: 'pointer',
    '&:hover .action-group': {
      display: 'flex',
    },
  },
}));

const Upload = () => {
  const [file, setFile] = useState();
  const classes = useStyles();
  const fileRef = useRef();

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const url = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return '';
  }, [file]);

  return (
    <Box display="flex" justifyContent="center">
      <Box position="relative" className={classes.photo}>
        <input
          type="file"
          ref={fileRef}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <Avatar
          onClick={handleClick}
          alt="avatar"
          src={url}
          className={classes.large}
        />
        <Box
          className="action-group"
          display="none"
          justifyContent="space-between"
          flexDirection="column"
          position="absolute"
          top={0}
          right={0}
          height="100%"
        >
          <IconButton icon="trash" color="error" />
          <IconButton icon="pencil" />
        </Box>
      </Box>
    </Box>
  );
};

export default Upload;
