import RefereeData from '../data/referee.js'

export default class Referee {
    constructor(first_name,last_name, id, phone,email) {
        this.first_name = first_name;
        this.last_name=last_name;
        this.id = id;
        this.phone=phone;
        this.email = email;
    }

    static getById(ID, callback) {
        RefereeData.findOne({
            where: {
                id: ID
            }
        }).then(function (referee) {
            callback(null, referee)
        })
    }

    async save() {
        let refereeData = await RefereeData.create(this);
        await refereeData.save();
    }

    static async getAll() {
        const referees = await RefereeData.findAll()
        console.log(referees)
        return referees.map(fromData)
    }

    static fromData(refereeData) {
        return new Referee(refereeData.first_name,refereeData.last_name, refereeData.id,refereeData.phone ,refereeData.email)
    }
}