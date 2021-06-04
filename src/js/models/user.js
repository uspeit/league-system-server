import UserData from '../data/user.js'

export default class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Methods
    async save() {
        let userData = await UserData.create(this);
        await userData.save();
    }

    // Static methods
    static getById(userId, callback) {
        UserData.findOne({
            where: {
                userId: userId
            }
        }).then(function (user) {
            callback(null, user)
        })
    }

    static register(username, password, email) {
        let user = new User(username, password, email);
        await user.save()
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

    static async getAll() {
        const users = await UserData.findAll()
        console.log(users)
        return users.map(fromData)
    }

    static fromData(userData) {
        return new User(userData.username, userData.password, userData.email)
    }
}