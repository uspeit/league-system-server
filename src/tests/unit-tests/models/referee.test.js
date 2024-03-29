import { UserData } from '../../../js/data/user.js'
import User from '../../../js/models/user.js'
import {RefereeData} from '../../../js/data/referee.js'
import Referee from '../../../js/models/referee.js'
import Game from '../../../js/models/game.js'
import {GameData} from '../../../js/data/game.js'

import {
    expect,
    test,
    jest
} from '@jest/globals'

jest.mock('../../../js/data/user.js');
jest.mock('../../../js/data/referee.js');
jest.mock('../../../js/data/game.js');

//jest.setTimeout(10000);


//beforeEach(async () => {
//    UserData.destroy();
//    RefereeData.destroy();
//    GameData.destroy();
//    
//});


// Referee - add
test('referee - add', async () => {

    let referee = await Referee.getById('12')
    expect(referee)
        .toBe(null)

    let error = await Referee.addReferee('sa','ah','12','054','sa@')
    referee = await Referee.getById('12')
    expect(referee)
        .not.toBe(null);
    expect(referee.first_name)
        .toBe('sa');
    expect(referee.idNum)
        .toBe('12');
    expect(referee.email)
        .toBe('sa@')

    error = await Referee.addReferee('aa','aa','12','054','aa@')
    referee = await Referee.getById('12')
    expect(referee.first_name)
        .toBe('sa')
    
    error = await Referee.addReferee('aa','aa','13','054','aa@')
    referee = await Referee.getById('13')
    expect(referee)
        .not.toBe(null);

    error = await Referee.addReferee('bb','bb','14','054','bb@')
    referee = await Referee.getById('14')
    expect(referee)
        .not.toBe(null);

    error = await Referee.addReferee('cc','cc','15','054','cc@')
    referee = await Referee.getById('15')
    expect(referee)
        .not.toBe(null);

    error = await Referee.addReferee('dd','dd','16','054','dd@')
    referee = await Referee.getById('16')
    expect(referee)
        .not.toBe(null);
    
    error = await Referee.addReferee('ee','ee','17','054','ee@')
    referee = await Referee.getById('17')
    expect(referee)
        .not.toBe(null);

    error = await Referee.addReferee('sa','ah',null,'054','sa@')
    expect(error)
        .toBe('One or more data is missing')
});

// Referee - Get by ID
test('Referee - Get by ID', async() => {
    
    let referee = await Referee.getById('208112557')
    expect(referee.first_name)
        .toBe('aiman');
    expect(referee.idNum)
        .toBe('208112557');
    expect(referee.email)
        .toBe('aiman@');

    referee = await Referee.getById('17')
    expect(referee.first_name)
        .toBe('ee');
    expect(referee.idNum)
        .toBe('17');
    expect(referee.email)
        .toBe('ee@');

    referee = await Referee.getById('18')
    expect(referee)
        .toBe(null);

    referee = await Referee.getById(null)
    expect(referee)
        .toBe(null);
});


// Referee - update data referee
test('Referee - Update Data Referee', async () => {
    
    let error = await Referee.updateData('bb','bb','13',null,null)
    let referee = await Referee.getById('13')
    expect(referee.first_name)
        .toBe('bb');
    expect(referee.idNum)
        .toBe('13');
    expect(referee.last_name)
        .toBe('bb');
    expect(referee.phone)
        .toBe('054');
    expect(referee.email)
        .toBe('aa@');

    error = await Referee.updateData('cc','cc','14','1234',null)
    referee = await Referee.getById('14')
    expect(referee.first_name)
        .toBe('cc');
    expect(referee.idNum)
        .toBe('14');
    expect(referee.last_name)
        .toBe('cc');
    expect(referee.phone)
        .toBe('1234');
    expect(referee.email)
        .toBe('bb@');

    error = await Referee.updateData('dd','dd','15','123','dd@')
    referee = await Referee.getById('15')
    expect(referee.first_name)
        .toBe('dd');
    expect(referee.idNum)
        .toBe('15');
    expect(referee.last_name)
        .toBe('dd');
    expect(referee.phone)
        .toBe('123');
    expect(referee.email)
        .toBe('dd@');  

    error = await Referee.updateData(null,null,'16',null,null)
    referee = await Referee.getById('16')
    expect(referee.first_name)
        .toBe('dd');
    expect(referee.idNum)
        .toBe('16');
    expect(referee.last_name)
        .toBe('dd');
    expect(referee.phone)
        .toBe('054');
    expect(referee.email)
        .toBe('dd@'); 

    error = await Referee.updateData('dd','dd',null,'123','dd@')
    expect(error)
        .toBe(null)

});

// Referee - Update Game Data
test('Referee - Update Game Data', async () => {

    let error = await Game.updateData(1,new Date(2021,8,11,19,0),null,null,null,null)
    let game=await Game.getById(1)
    expect(game.gameId)
        .toBe(1);
    expect(game.Home_team)
        .toBe('Bnie Sakhnin');
    expect(game.Away_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Stadium)
        .toBe('Doha')
    expect(game.RefereeId)
        .toBe('12');
    expect(game.Result)
        .toBe("0:0");
    
    error = await Game.updateData(2,null,'Tel aviv',null,null,null)
    game = await Game.getById(2)
    expect(game.gameId)
        .toBe(2);
    expect(game.Home_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Away_team)
        .toBe('Hapoel Tel aviv');
    expect(game.Stadium)
        .toBe('Tel aviv')
    expect(game.RefereeId)
        .toBe('13');
    expect(game.Result)
        .toBe("0:0");

    error = await Game.updateData(1,null,null,'13',null,null)
    game = await Game.getById(1)
    expect(game.gameId)
        .toBe(1);
    expect(game.Home_team)
        .toBe('Bnie Sakhnin');
    expect(game.Away_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Stadium)
        .toBe('Doha')
    expect(game.RefereeId)
        .toBe('13');
    expect(game.Result)
        .toBe("0:0");
    
    error = await Game.updateData(3,null,null,'12',null,null)
    game = await Game.getById(3)   
    expect(game.gameId)
        .toBe(3);
    expect(game.Home_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Away_team)
        .toBe('Maccabi Tel aviv');
    expect(game.Stadium)
        .toBe('Turner')
    expect(game.RefereeId)
        .toBe('12');
    expect(game.Result)
        .toBe("0:0");

    error = await Game.updateData(4,null,null,null,"1:0",['30.7.2021 18:31 31 ,goooal Maccabi Haifa'])
    game = await Game.getById(4)
    expect(game.gameId)
        .toBe(4);
    expect(game.Home_team)
        .toBe('Maccabi Haifa');
    expect(game.Away_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Stadium)
        .toBe('Sami Offer')
    expect(game.RefereeId)
        .toBe('15');
    expect(game.Result)
        .toBe("1:0");
    expect(game.Events[0])
        .toBe('30.7.2021 18:31 31 ,goooal Maccabi Haifa')
    
    error = await Game.updateData(5,null,null,null,null,null)
    expect(error)
        .toBe(null)
    
    error = await Game.updateData(null,new Date(2021,8,11,19,0),'Tel aviv','12',"1:0",[])
    expect(error)
        .toBe(null)

});

// Referee - Get referee games
test('Referee - Get referee games', async () => {
    
    let gamesReferee= await Referee.getMyGames('12')
    expect(gamesReferee[0].gameId)
        .toBe(3);
    
    gamesReferee= await Referee.getMyGames('13')
    expect(gamesReferee[0].gameId)
        .toBe(1);
    expect(gamesReferee[1].gameId)
        .toBe(2);

    gamesReferee= await Referee.getMyGames('15')     
    expect(gamesReferee[0].gameId)
        .toBe(4);

    gamesReferee= await Referee.getMyGames('14')
    expect(gamesReferee)
        .toBe(null);

    gamesReferee= await Referee.getMyGames(null)
    expect(gamesReferee)
        .toBe(undefined)

});

test('Referee - Update Event Game', async () => {
    
    let error = await Game.updateEvent(4,'15','30.7.2021 18:31 31 ,goooal Hapoel Beer Sheva',1)
    let game = await Game.getById(4)
    expect(error)
        .toBe(true)
    expect(game.Events[0])
        .toBe('30.7.2021 18:31 31 ,goooal Hapoel Beer Sheva')
    
    error = await Game.updateEvent(1,'15','30.7.2021 18:31 31 ,goooal Hapoel Beer Sheva',1)
    expect(error)
        .toBe(false)

    error = await Game.updateEvent(4,'15','30.7.2021 18:31 31 ,goooal Hapoel Beer Sheva',2)
    expect(error)
        .toBe(false)

    error = await Game.updateEvent(5,'15','30.7.2021 18:31 31 ,goooal Hapoel Beer Sheva',2)
    expect(error)
        .toBe(false)

});

test('Referee - add Event to Game', async () => {

    let error = await Referee.addEventsGame('15',4,'30.7.2021 19:40 85 ,Red cart Loai Taha')
    let game = await Game.getById(4)
    expect(game.Events[1])
        .toBe('30.7.2021 19:40 85 ,Red cart Loai Taha')
    
    error = await Referee.addEventsGame('15',null,'30.7.2021 19:40 85 ,Red cart Loai Taha')
    game = await Game.getById(4)
    expect(error)
        .toBe(undefined)

    error = await Referee.addEventsGame('15',2,'30.7.2021 19:40 85 ,Red cart Loai Taha')
    game = await Game.getById(2)
    expect(game.Events.length)
        .toBe(0)

    error = await Referee.addEventsGame(
      "15",
      6,
      "30.7.2021 19:40 85 ,Red cart Loai Taha"
    );
    expect(error).toBe("Game not found!")

})