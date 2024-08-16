//OPTIONAL USE, DO NOT REQUIRED.
//BROWSER AUTOMATICALLY ADDS COOKIES WHICH LONG TOKEN IS IN.
export const GetSpecificToken = 
async (cookie) =>
{
    return decodeURI(document.cookie.split(';').find(cookie => cookie.includes(cookie)).split('=')[1]);
}