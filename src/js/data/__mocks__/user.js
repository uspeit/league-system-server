function flattenObj(obj, parent, res = {}) {
    for (let key in obj) {
        let propName = key;
        if (typeof obj[key] == 'object') {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}
// Mock
class UserData {
    static saved = null;
    static usedNames = ['test', 'test2'];
    static usedPasswords = ['qwe123', '123qwe'];
    static usedEmails = ['test@mail.com', 'test2@mail.com'];

    constructor(userId, idUserNum, username, password, email, role) {
        this.userId = userId;
        this.idUserNum = idUserNum;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    save() {
        UserData.saved = this;
        UserData.usedNames.push(this.username);
        UserData.usedPasswords.push(this.password);
        UserData.usedEmails.push(this.email);
    }

    static async create(user) {
        return new UserData(user.userId, user.idUserNum, user.username, user.password, user.email, user.role);
    }

    static async findOne(query) {
        let userId = 0;
        const params = flattenObj(query);
        if (params.userId) {
            if (params.userId > this.usedNames.length)
                return null;
            userId = params.userId - 1;
            return new UserData(params.userId, '123123123', this.usedNames[userId], this.usedPasswords[userId], this.usedEmails[userId], 'player');
        }

        if (params.username && params.password) {
            userId = this.usedNames.indexOf(params.username);
            if (this.usedPasswords[userId] !== params.password)
                return null
        }

        let username = params.username;
        let email = params.email;
        username = username || email.split('@')[0];
        email = email || username + '@mail.com';
        let password = params.password || 'pass123'
        userId++;
        return new UserData(userId, '123123123', username, password, email, 'player');
    }

    static destroy() {
        this.usedNames = ['test', 'test2'];
        this.usedPasswords = ['qwe123', '123qwe'];
        this.usedEmails = ['test@mail.com', 'test2@mail.com'];
    }
}

async function checkUserCredentials(username, email) {
    return UserData.usedNames.includes(username) || UserData.usedEmails.includes(email)
}

export {
    checkUserCredentials,
    UserData
}