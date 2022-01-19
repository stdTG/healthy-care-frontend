const convertToTitleCase = (str: string | undefined) => {
  const firstChar = str?.[0]

  if (!str || !firstChar) {
    return ''
  }

  return firstChar.toUpperCase() + str.slice(1).toLowerCase();
};

export default convertToTitleCase;
