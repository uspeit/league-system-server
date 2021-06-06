import RefereeData from '../data/referee.js'
import GameData from '../data/games.js'

export default class Referee {
    constructor(first_name,last_name,idNum, phone, email) {
        this.first_name = first_name;
        this.last_name=last_name;
        this.idNum = idNum;
        this.phone=phone;
        this.email = email;
    }

    static async getById(idNum) {
        const referee= await RefereeData.findOne({
            where: {
                idNum: idNum
            }
        })
        //console.log(referee)
        if(referee!==null){
            return{
                referee
            }
        }
        else{
            return null
        }
    }

    static async updateData(first_name,last_name,idNum,phone,email) {
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


    static async getMyGames(idUserNum){
        const games=await GameData.findAll({
            where: {RefereeId:idUserNum}
        });
        return games;
    }

    static async getAll() {
        const referees = await RefereeData.findAll()
        console.log(referees)
        return referees.map(fromData)
    }

    static async addEventsGame(idNum,gameId,event){
        if(event && gameId){
            await GameData.update(
                {'Events' : sequelize.fn('array_append', sequelize.col('Events'), event)},
                {where: {
                    gameId:gameId,
                    RefereeId:idNum
                    }
                });
            
            return true
        }
        return false
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