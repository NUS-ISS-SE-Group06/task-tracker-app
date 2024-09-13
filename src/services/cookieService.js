
// Function to check if a specific cookie exists
export const cookieExists = (cookieName) => {
    return document.cookie.split(';').some((cookie) => cookie.trim().startsWith(`${cookieName}=`));
};
  
// Function to get the value of a specific cookie

export const getCookieValue = (cookieName) => {
    console.log(cookieName)
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            console.log(cookie.substring(name.length, cookie.length))
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
};

// Function to set a cookie with a specified expiry time
export const setCookie = (cookieName, value, expiryDays) => {
   
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const expiryDate = new Date(Date.now() + expiryDays * 86400e3).toUTCString();
    document.cookie = `${cookieName}=${value}; expires=${expiryDate}; path=/`;
    console.log(document.cookie )
};
// export const setCookie = (userRole) => {
   
//     clearCookie(userRole);
//     document.cookie = `userRole=${userRole}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
//     console.log(document.cookie)
// };

// Function to clear a cookie by setting its expiry date to the past
export const clearCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};