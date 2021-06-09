// Mock Class
export default class User {
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