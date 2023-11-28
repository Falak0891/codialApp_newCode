export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
}

export const history = {
  location: null,
};

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
