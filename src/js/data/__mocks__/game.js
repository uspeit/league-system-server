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
class GameData {
    static saved = null;
    static used_gameId=[1,2,3,4]
    static used_date = [new Date(2021,6,21,15,0),new Date(2021,6,28,19,0),new Date(2021,7,15,21,0),new Date(2021,7,30,18,0)];
    static used_Home_team = ['Bnie Sakhnin','Hapoel Beer Sheva','Hapoel Beer Sheva','Maccabi Haifa'];
    static used_Away_team = ['Hapoel Beer Sheva','Hapoel Tel aviv','Maccabi Tel aviv','Hapoel Beer Sheva'];
    static used_Stadium=['Doha','Turner','Turner','Sami Offer']
    static used_RefereeId=['12','13',null,'15']
    static used_Result=["0:0","0:0","0:0","0:0"]
    static used_Events=[[],[],[],[]]

    constructor(gameId,Date,Home_team,Away_team,Stadium,refereeId,result,events) {
        this.gameId=gameId;
        this.Date=Date;
        this.Home_team=Home_team;
        this.Away_team=Away_team;
        this.Stadium=Stadium;
        this.RefereeId=refereeId;
        this.Result=result;
        if(events){
            this.Events=events;
        }else{
            this.Events=[]
        }
    }

    save() {
        GameData.saved = this;
        let index=GameData.used_gameId.indexOf(this.gameId);
        if(index>=0){
            GameData.used_date[index]=this.Date;
            GameData.used_Home_team[index]=this.Home_team;
            GameData.used_Away_team[index]=this.Away_team;
            GameData.used_Stadium[index]=this.Stadium;
            GameData.used_RefereeId[index]=this.RefereeId;
            GameData.used_Result[index]=this.Result;
            GameData.used_Events[index]=this.Events;
        }
        else{
            GameData.used_date.push(this.Date);
            GameData.used_Home_team.push(this.Home_team);
            GameData.used_Away_team.push(this.Away_team);
            GameData.used_Stadium.push(this.Stadium);
            GameData.used_RefereeId.push(this.RefereeId);
            GameData.used_Result.push(this.Result);
            GameData.used_Events.pusth(this.Events);

        }
    }

    static async create(game) {
        return new GameData(game.gameId,game.Date,game.Home_team,game.Away_team,game.Stadium,game.RefereeId,game.Result,game.Events);
    }

    static async findOne(query) {
        let gameId = 0;
        const params = flattenObj(query);
        if (params.gameId) {
            if (params.gameId > this.used_Away_team.length)
                return null;
            gameId = params.gameId - 1;
            return new GameData(params.gameId, GameData.used_date[gameId], GameData.used_Home_team[gameId],
                GameData.used_Away_team[gameId], GameData.used_Stadium[gameId],GameData.used_RefereeId[gameId],GameData.used_Result[gameId],
                GameData.used_Events[gameId]);
        }
        return null
    }
    static async findAll(query) {
        const params = flattenObj(query);
        if (params.RefereeId) {
            let index = []
            GameData.used_gameId.forEach(gameId => {
                if(params.RefereeId===GameData.used_RefereeId[gameId-1]){
                    index.push(gameId-1)        
                }
            });
            if (index.length>0){
                let games=[];
                index.forEach(gameId => {
                    games.push(new GameData(gameId+1, GameData.used_date[gameId], GameData.used_Home_team[gameId],
                        GameData.used_Away_team[gameId], GameData.used_Stadium[gameId],GameData.used_RefereeId[gameId],GameData.used_Result[gameId],
                        GameData.used_Events[gameId]))
                })
                return games;
            }
            return null
        }
        return null
    }


    static destroy() {
        this.used_date = [new Date(2021,6,21,15,0),new Date(2021,6,28,19,0),new Date(2021,7,15,21,0),new Date(2021,7,30,18,0)];
        this.used_Home_team = ['Bnie Sakhnin','Hapoel Beer Sheva','Hapoel Beer Sheva','Maccabi Haifa'];
        this.used_Away_team = ['Hapoel Beer Sheva','Hapoel Tel aviv','Maccabi Tel aviv','Hapoel Beer Sheva'];
        this.used_Stadium=['Doha','Turner','Turner','Sami Offer']
        this.used_RefereeId=['12',null,'13','15']
        this.used_Result=["0:0","0:0","0:0","0:0"]
        this.used_Events=[[],[],[],[]]
    }
}


export {GameData}