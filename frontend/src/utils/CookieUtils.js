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
  