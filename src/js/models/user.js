import {
    UserData,
    checkUserCredentials
} from '../data/user.js';

export default class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Methods

    // Static methods
    static getById(userId, callback) {
        UserData.findOne({
            where: {
                userId: userId
            }
        }).then(function (user) {
            callback(user, null)
        })
    }

    static async register(username, password, email) {
        if (await checkUserCredentials(username, email))
            return false;

        let user = new User(username, password, email);
        let userData = await UserData.create(user);
        await userData.save();
        return true;
    }

    static async login(username, password) {
        const user = await UserData.findOne({
            where: {
                username: username,
                password: password
            }
        })
        console.log(user)
        if (user !== null)
            return {
                sub: user.userId
            }
        else
            return null
    }

    // Static helper methods
    static async getAll() {
        const users = await UserData.findAll()
        console.log(users)
        return users.map(fromData)
    }

    static fromData(userData) {
        return new User(userData.username, userData.password, userData.email)
    }
}