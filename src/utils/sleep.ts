export const sleep = (time = 1500) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
