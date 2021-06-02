import UserData from '../data/user.js'

export default class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    async validate() {
        const users = await UserData.findAll({
            where: {
                username: this.username,
                password: this.password
            }
          })
        console.log(users)
        return users.length > 0
    }


    async save() {
        let userData = await UserData.create(this);
        await userData.save();
    }

    static async getAll() {
        const users = await UserData.findAll()
        console.log(users)
        return users.map(function (user) {
            return new User(user.username, user.password, user.email)
        })
    }
}