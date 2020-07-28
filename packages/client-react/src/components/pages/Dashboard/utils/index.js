export const checkUserHasLoggedIn = user => {
  if (user) {
    return true;
  }
  return false;
};

export const checkUserHasVerified = () => {
  return true;
};

// This function retuns the login state of current user, as in this mapping:
// 1: User has both logged in and their account is verified
// 0: User has not logged in
// -1: User has logged in but their account is not yet verified
export const checkLoginState = () => {
  const isUserLoggedIn = checkUserHasLoggedIn();
  if (!isUserLoggedIn) {
    return 0;
  }
  if (isUserLoggedIn) {
    const isUserVerified = checkUserHasVerified();
    if (!isUserVerified) {
      return -1;
    }
  }
  return 1;
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
