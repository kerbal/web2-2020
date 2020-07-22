export default (name, message) => {
  const error = new Error(message);
  error.name = name;
  return error;
};
