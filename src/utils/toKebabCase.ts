const convertToKebabCase = (str: string) => {
  return str
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

export default convertToKebabCase;
