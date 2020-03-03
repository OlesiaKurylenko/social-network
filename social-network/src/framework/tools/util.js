const snu = {
    delay(ms = 1000) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, ms);
        });
    }
};
const isUndefined = (value) => {
    if (value === undefined) {
        return true;
    }
    return false;
}
export { snu, isUndefined };
