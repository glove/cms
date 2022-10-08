const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const characterLength = characters.length;

module.exports = (length) => {
    let generated = '';

    for (let i = 0; i < length; i++) {
        generated += characters.charAt(Math.floor(Math.random() * characterLength))
    }

    return generated
}