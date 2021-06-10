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
        return true
    }
    
    static getById(gameId) {
        if (gameId===1)
            return true
        return false
        
    }
    
    static async updateEvent(gameId,RefereeId,event,row) {
        if(gameId===1 && RefereeId==='13' && row===1)
            return true
        return false
    }
}