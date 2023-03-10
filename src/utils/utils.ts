export function generateID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    const firstPartString = ("000" + firstPart.toString(36)).slice(-3);
    const secondPartString = ("000" + secondPart.toString(36)).slice(-3);
    console.log(firstPartString + secondPartString)
    return firstPartString + secondPartString;
}