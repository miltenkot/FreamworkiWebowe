const API = 'https://jsonplaceholder.typicode.com';

const argsToString = (args: object): string => {
    let argsString = '?';
    for (const [key, value] of Object.entries(args)) {
        if (value) {
            argsString += `${key}=${value}${argsString.length > 1 ? '&' : ''}`;
        }
    }

    return argsString.length > 1 ? argsString : '';
}

export {API, argsToString};