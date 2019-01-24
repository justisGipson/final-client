let APIURL = '';

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'jg-gear-locker.herokuapp.com':
        APIURL = 'https://gear-locker.herokuapp.com';
    
}

export default APIURL;