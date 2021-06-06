import GameData from "../data/games.js";
import RefereeData from "../data/referee.js";

export default class Game {
    constructor(date,Home_team,Away_team,Stadium,refereeId,result,events) {
        this.Date=date;
        this.Home_team=Home_team;
        this.Away_team=Away_team;
        this.Stadium=Stadium;
        this.RefereeId=refereeId;
        this.Result=result;
        this.Events=events;
    }

    static async updateData(gameId,Date,Stadium,RefereeId,Result,Events) {
        if(gameId){
            return await GameData
                .findOne({ where: {gameId:gameId} })
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
                    }
                })
        }
    }
    static async getById(gameId) {
        const game= await GameData.findOne({
            where: {
                gameId: gameId
            }
        })
        if(game!==null){
            return{
                game
            }
        }
        else{
            return null
        }
    }
    static async updateEvent(gameId,RefereeId,event,row) {
        const game= await GameData.findOne({
            where: {
                gameId: gameId,
                RefereeId:RefereeId
            }
        })
        if(game!==null){
            //check if the row > length or <=0
            game.Events[row-1]=event
        }
        else{
            return null
        }
    }
}