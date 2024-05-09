//get cookie by name
export function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
//time is hours
export function setCookie(name, value, time){
    let d = new Date();
    d.setTime(d.getTime() + 1 * parseInt(time) * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
    name+"=" + value + ";" + expires + ";path=/";
}

//clear all cookies = logout 
export function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}