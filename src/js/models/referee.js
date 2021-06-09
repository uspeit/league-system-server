import RefereeData from '../data/referee.js'
import GameData from '../data/game.js'

export default class Referee {
    constructor(first_name,last_name,idNum, phone, email) {
        this.first_name = first_name;
        this.last_name=last_name;
        this.idNum = idNum;
        this.phone=phone;
        this.email = email;
    }

    static getById(idNum) {
        if(idNum){
            let referee=RefereeData.findOne({where: {idNum: idNum}})
            if(referee){
                return referee
            }
        }
        return undefined
    }
    
    

    static async updateData(first_name,last_name,idNum,phone,email) {
        if(idNum){
            return await RefereeData
                .findOne({ where: {idNum:idNum} })
                .then(function(referee) {
                    // update
                    if(referee){
                        if(first_name){
                            referee.first_name=first_name;
                        }
                        if(last_name){
                            referee.last_name=last_name;
                        }
                        if(idNum){
                            referee.idNum=idNum;
                        }
                        if(phone){
                            referee.phone=phone;
                        }
                        if(email){
                            referee.email=email;
                        }
                        referee.save()
                    }
                })
        }
        return undefined
    }


    static getMyGames(idUserNum){
        if(idUserNum){
            const games= GameData.findAll({
                where: {RefereeId:idUserNum}
            });
            return games;
        }
        return undefined
    }
    /*
    static async getAll() {
        const referees = await RefereeData.findAll()
        console.log(referees)
        return referees.map(fromData)
    }
    static fromData(refereeData) {
        return new Referee(refereeData.first_name,refereeData.last_name, refereeData.id,refereeData.phone ,refereeData.email)
    }*/
    static async addEventsGame(idNum,gameId,event){
        if(event && gameId){
            return await GameData
                .findOne({where: [{gameId:gameId,RefereeId:idNum}]})
                .then(function(game) {
                    // update
                    if(game.RefereeId===idNum){
                        if(event){
                            game.Events.push(event);
                        }
                        game.save()
                    }
                })
        }
    }
    
    static async addReferee(first_name,last_name,idNum,phone,email){
        let referee= await this.getById(idNum);
        if(referee){
            return false
        }
        const newReferee=new Referee(first_name,last_name,idNum,phone,email)
        let refereeData = await RefereeData.create(newReferee);
        await refereeData.save()
        return true;
    }   
}