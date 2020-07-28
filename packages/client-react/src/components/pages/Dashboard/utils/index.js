export const checkUserHasLoggedIn = () => {
  return true;
};

export const checkUserHasVerified = () => {
  return true;
}

export const getDefaultPage = () => {
  return 'Overview';
}

export const getCurrentUser = () => {
  return {
    name: 'Khoa',
  };
};

export const getCurrentUserName = () => {
  return getCurrentUser().name;
};
