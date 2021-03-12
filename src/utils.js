function uuid(prefix = '', date = true) {
  let counter = 0
  return () => {
    return `${date ? Date.now().toString(16) : ''}${prefix}${counter++}`
  }
}

// https://www.w3schools.com/js/js_cookies.asp
export function getCookie(cname) {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
export function setCookie(cname, cvalue, exdays = 15) {
  const date = new Date(Date.now() + exdays * 24 * 60 * 60 * 1000)

  const expires = 'expires=' + date.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const uid = uuid('TODO')
