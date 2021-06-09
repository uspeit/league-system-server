// Mock Class
export default class User {
  static lastRegistered = {};
  static lastLogin = {};

  constructor(username, password, idUserNum, email, role) {
    this.username = username;
    this.password = password;
    this.idUserNum = idUserNum;
    this.email = email;
    this.role = role;
  }

  // Methods

  // Static methods
  static getById(userId, callback) {}

  static async register(username, password, idUserNum, email, role) {
    if(username === 'fail')
      return 'Credentials aleady in use'

    User.lastRegistered = {
      username,
      password,
      idUserNum,
      email,
      role,
    };

    return null;
  }

  static async login(username, password) {
    if (username !== "fail") {
      User.lastLogin = { username, password };
      return {
        sub: 1,
      };
    } else return null;
  }

  // Static helper methods
  static async getAll() {}

  static fromData(userData) {}
}
