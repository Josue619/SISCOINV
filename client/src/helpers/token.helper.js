export class Token {

  iss = {
    signin: 'http://localhost:3000/api/auth/signin',
    signup: 'http://localhost:3000/api/auth/signup'
  };

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  loggedIn() {
    return this.isValid();
  }

}