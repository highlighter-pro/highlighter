/*
* Creates a pseudorandom alphanumeric lower case 10 character string,
* like: 'nk8pi44rg7'
* */
const createRandomId = () => {
    // ((Math.random()).toString(36).substring(2, 12)).length
    // 10
    return (Math.random()).toString(36).substring(2, 12);
}

export default createRandomId;