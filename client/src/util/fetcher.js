function inMemoryUserManagerFunc () {
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
};

export const inMemoryUserManager = inMemoryUserManagerFunc();

function updateOptions(options) {
    const update = { ...options };
    let user = inMemoryUserManager.getUser()
    if (user) {
      update.headers = {
        ...update.headers,
        Authorization: `Bearer ${user.tokenId}`,
      };
    }
    return update;
  }
  
export function fetcher(url, options) {
    return fetch(url, updateOptions(options));
}
