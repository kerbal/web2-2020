export const checkUserHasLoggedIn = user => {
  if (user) {
    return true;
  }
  return false;
};

export const checkUserHasVerified = user => {
  return user.status === 'VERIFIED';
};

export const checkUserIsWaiting = user => {
  return user.status === 'WAITING';
};

export const getDefaultPage = () => {
  return 'Overview';
};

export const getCurrentUser = () => {
  return {
    name: 'Khoa',
  };
};

export const getCurrentUserName = () => {
  return getCurrentUser().name;
};
