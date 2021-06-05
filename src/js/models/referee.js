import RefereeData from '../data/referee.js'
//import GameData from '../data/game.js'

export default class Referee {
    constructor(first_name,last_name, id, phone,email) {
        this.first_name = first_name;
        this.last_name=last_name;
        this.idNum = id;
        this.phone=phone;
        this.email = email;
    }

    static getById(id, callback) {
        RefereeData.findOne({
            where: {
                id: id
            }
        }).then(function (referee) {
            callback(referee,null)
        })
    }
    static async updateData(first_name,last_name,id,phone,email){
        if(first_name!==null){
            this.first_name=first_name;
        }
        if(last_name!==null){
            this.last_name=last_name;
        }
        if(id!==null){
            this.id=id;
        }
        if(phone!==null){
            this.phone=phone;
        }
        if(email!==null){
            this.email=email;
        }
        await self.save();
    }
    //async save() {
    //    let refereeData = await RefereeData.create(this);
    //    await refereeData.save();
    //}

    static async getMyGames(){
        let myGames=[]
        const games=await GameData.findAll()
        games.forEach(game => {
            if(game.referee.id==this.id){
                myGames.push(game);
            }            
        });
        return myGames;
    }

    static async getAll() {
        const referees = await RefereeData.findAll()
        console.log(referees)
        return referees.map(fromData)
    }

    static async addEventsGame(game,event){
        if(event){
            game.events.push(event)
        }
    }
    static async updateEventsGame(game,event){
        
    }
    static async addReferee(first_name,last_name,idNum,phone,email){
        const referee=new Referee(first_name,last_name,idNum,phone,email)
        let refereeData = await RefereeData.create(referee);
        await refereeData.save()
    }   

    static fromData(refereeData) {
        return new Referee(refereeData.first_name,refereeData.last_name, refereeData.id,refereeData.phone ,refereeData.email)
    }
}