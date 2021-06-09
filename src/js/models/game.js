import GameData from "../data/game.js";
import RefereeData from "../data/referee.js";

export default class Game {

    /* istanbul ignore next */
    constructor(date,Home_team,Away_team,Stadium,refereeId,result,events) {
        this.Date=date;
        this.Home_team=Home_team;
        this.Away_team=Away_team;
        this.Stadium=Stadium;
        this.RefereeId=refereeId;
        this.Result=result;
        if(events===null){
            this.Events=[];
        }else{
            this.Events=events
        }
    }

    static async updateData(gameId,Date,Stadium,RefereeId,Result,Events) {
        if(gameId){
            return await GameData
            .findOne({where: {gameId: gameId} })
            .then(function(game) {
                // update
                if(game){
                    if(Date){
                        game.Date=Date;
                    }
                    if(Stadium){
                        game.Stadium=Stadium;
                    }
                    if(RefereeId){
                        game.RefereeId=RefereeId;
                    }
                    if(Result){
                        game.Result=Result;
                    }
                    if(Events){
                        Events.forEach(event => {
                            game.Events.push(event)
                        });
                    }
                    game.save()
                    return true
                }
            })
        }
        return false
    }
    
    static getById(gameId) {
        const game= GameData.findOne({
            where: {
                gameId: gameId
            }
        })
        return game
    }
    
    static async updateEvent(gameId,RefereeId,event,row) {
        const game= await GameData.findOne({
            where: {
                gameId: gameId,
                RefereeId:RefereeId
            }
        })
        if(game){
            if(game.RefereeId===RefereeId){
                //const start = Date.now();
                //const dif=start-game.Date.getTime()
                //if(dif<=5*60*60*1000){
                    if(row>0 && row<=game.Events.length){
                        game.Events[row-1]=event
                        return true;
                    }
                    return false;
                //}
            }
            return false
        }
        return false;
    }
    /*
    static async getAll() {
        const games = await GameData.findAll()
        console.log(games)
        return games.map(fromData)
    }*/
    /*
    static fromData(gameData) {
        return new Game(gameData.date,gameData.Home_team,gameData.Away_team,gameData.Stadium,gameData.refereeId,gameData.result,gameData.events)
    }*/
}