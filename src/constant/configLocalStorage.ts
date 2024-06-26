export const USER_LOGIN = "USER_LOGIN";

export const userLocalStorage = {
    set: (userData: any) => {
        const userJson = JSON.stringify(userData);
        localStorage.setItem(USER_LOGIN, userJson);
    },
    get: () => {
        const userJson = localStorage.getItem(USER_LOGIN);
        if (userJson !== null) {
            return JSON.parse(userJson);
        } else {
            return null;
        }
    },
    remove: () => {
        localStorage.removeItem(USER_LOGIN);
    },
};
