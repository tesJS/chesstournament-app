export default class User {
  constructor(username, passwordHash, role) {
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;    
  }

  getUserName() {
    return this.username;
  }
  getPasswordHash() {
    return this.passwordHash;
  }
  
}