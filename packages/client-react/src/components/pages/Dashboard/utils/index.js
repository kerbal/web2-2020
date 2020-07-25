export const checkUserHasLoggedIn = () => {
  return true;
}

export const getDefaultPage = () => {
  return 'Saving';
}

export const getCurrentUser = () => {
  return {
    name: 'Khoa'
  };
}

export const getCurrentUserName = () => {
  return getCurrentUser().name;
}