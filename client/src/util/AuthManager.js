function AuthManagerFunctions () {
  let user = null;
 
  const getUser = () => user;
 
  const setUser = (given) => {
    user = given;
    return true;
  };

  const deleteUser = () => {
    user = null;
  };
 
  return {
    getUser,
    setUser,
    deleteUser
  };
}

export const AuthManager = AuthManagerFunctions();

function withUserToken(options) {
  const update = { ...options };
  let user = AuthManager.getUser();
  if (user) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${user.tokenId}`,
    };
  }
  return update;
}
  
export function fetchWithUserToken(url, options) {
  return fetch(url, withUserToken(options));
}
