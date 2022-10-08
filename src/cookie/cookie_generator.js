const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

module.exports = () => {
    let cookie = '';
    const characterLength = characters.length;

    for (let i = 0; i < 256; i++) {
        cookie += characters.charAt(Math.floor(Math.random() * characterLength))
    }

    return cookie
}