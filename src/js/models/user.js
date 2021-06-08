import {
    UserData,
    checkUserCredentials
} from '../data/user.js';

export default class User {
    constructor(username, password, idUserNum, email, role) {
        this.username = username;
        this.password = password;
        this.idUserNum = idUserNum;
        this.email = email;
        this.role = role;
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

    static async register(username, password, idUserNum, email, role) {
        if (!['user', 'player', 'referee', 'coach', 'manager', 'representative'].includes(role))
            return 'Please provide a role for the user';

        if (await checkUserCredentials(username, email))
            return 'Credentials aleady in use';

        let user = new User(username, password, idUserNum, email, role);
        let userData = await UserData.create(user);
        await userData.save();
        return null;
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