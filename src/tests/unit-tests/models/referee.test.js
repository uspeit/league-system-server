import {
    UserData
} from '../../../js/data/user.js'
import User from '../../../js/models/user.js'
import RefereeData from '../../../js/data/referee.js'
import Referee from '../../../js/models/referee.js'
import {
    expect,
    test
} from '@jest/globals'
import Game from '../../../js/models/game.js'
import GameData from '../../../js/data/games.js'



beforeEach(async () => {
    await UserData.sync({
        force: true
    })
    await RefereeData.sync({
        force:true
    })

    //let referee = await RefereeData.create({
    //    first_name:'aiman',
    //    last_name:'saied',
    //    idNum:'12',
    //    phone:'054',
    //    email: 'aiman@'
    //})
    //await referee.save()
    
    let referee = await RefereeData.create({
        first_name:'moshe',
        last_name:'levi',
        idNum:'951',
        phone:'123456',
        email: 'moshe@'
    })
    await referee.save()

    let entry = await UserData.create({
        username: 'aiman',
        password: '123',
        email: 'aiman@mail.com',
        role: 'referee'
    })
    await entry.save();

    entry = await UserData.create({
        username: 'rep',
        password: '123',
        idUserNum: '123',
        email: 'rep',
        role: 'representative'
    })
    await entry.save();

    let game1 = await GameData.create({
        Date: new Date(2021,6,21,15,0),
        Home_team:'Bnie Sakhnin',
        Away_team:'Hapoel Beer Sheva',
        Stadium: 'Doha',
        RefereeId:'12',
        Result: "0:0",
        Events: []
    })
    await game1.save()
    let game2 = await GameData.create({
        Date: new Date(2021,6,28,19,0),
        Home_team:'Hapoel Beer Sheva',
        Away_team:'Hapoel Tel aviv',
        Stadium: 'Turner',
        Result: "0:0",
        Events: []
    })
    await game2.save()

    game2 = await GameData.create({
        Date: new Date(2021,7,15,21,0),
        Home_team:'Hapoel Beer Sheva',
        Away_team:'Maccabi Tel aviv',
        Stadium: 'Turner',
        RefereeId:'13',
        Result: "0:0",
        Events: []
    })
    await game2.save()

    game2 = await GameData.create({
        Date: new Date(2021,7,30,18,0),
        Home_team:'Maccabi Haifa',
        Away_team:'Hapoel Beer Sheva',
        RefereeId:'15',
        Stadium: 'Sami Aoffer',
        Result: "0:0",
        Events: []

    })
    await game2.save()
    
});


// Referee - add
test('referee - add', async () => {
    let referee = await RefereeData.findOne({
        where: {
            idUserNum: '12'
        }
    });
    expect(user)
        .toBe(null)

    let error = await Referee.addReferee('aiman','saied','12','054','aimans@')
    referee = await RefereeData.findOne({
        where: {
            idUserNum: '12'
        }
    });
    expect(error)
        .toBe(null);
    expect(referee)
        .not.toBe(null);
    expect(referee.first_name)
        .toBe('aiman');
    expect(referee.idNum)
        .toBe('12');
    expect(referee.email)
        .toBe('aimans@')


    error = await Referee.addReferee('aiman','saied','12','054','aiman@')
    expect(error)
        .not.toBe(null);

    error = await Referee.addReferee('aa','aa','12','054','aa@')
    expect(error)
        .toBe(null);
    error = await Referee.addReferee('aa','aa','13','054','aa@')
    expect(error)
        .toBe(null);
    error = await Referee.addReferee('bb','bb','14','054','bb@')
    expect(error)
        .not.toBe(null);
    error = await Referee.addReferee('cc','cc','15','054','cc@')
    expect(error)
        .not.toBe(null);
        error = await Referee.addReferee('dd','dd','16','054','dd@')
    expect(error)
        .not.toBe(null);
    error = await Referee.addReferee('ee','ee','17','054','ee@')
        expect(error)
        .not.toBe(null);
});



// Referee - Get by ID
test('Referee - Get by ID', async () => {
    const getByIdAsync = function (idReferee) {
        return new Promise(function (resolve, reject) {
            Referee.getById(idReferee, function (referee, err) {
                resolve(referee)
            });
        });
    }

    let referee = await getByIdAsync('12')
    expect(referee.first_name)
        .toBe('aiman');
    expect(referee.idNum)
        .toBe('12');
    expect(referee.email)
        .toBe('aiman@');

    referee = await getByIdAsync('17')
    expect(referee.first_name)
        .toBe('ee');
    expect(referee.idNum)
        .toBe('17');
    expect(referee.email)
        .toBe('ee@');


    referee = await getByIdAsync('18')
    expect(referee)
        .toBe(null);

    referee = await getByIdAsync(null)
        expect(referee)
        .toBe(null);
});


// Referee - update data referee
test('Referee - Update Data Referee', async () => {
    const updateDataReferee = function (first_name,last_name,idNum,phone,email) {
        return new Promise(function (resolve, reject) {
            Referee.updateData(first_name,last_name,idNum,phone,email, function (referee, err) {
                resolve(referee)
            });
        });
    }

    let referee = await updateDataReferee('bb','bb','13')
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

    referee = await updateDataReferee('cc','cc','14','1234')
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

    referee = await updateDataReferee('dd','dd','15','123','dd@')
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

    referee = await updateDataReferee(null,null,'16',null,null)
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

});

// Referee - Update Game Data
test('Referee - Update Game Data', async () => {
    const updateDataGame = function (gameId,Date,Stadium,RefereeId,Result,Events) {
        return new Promise(function (resolve, reject) {
            Game.updateData(gameId,Date,Stadium,RefereeId,Result,Events, function (games, err) {
                resolve(games)
            });
        });
    }

    let game = await updateDataGame('1',new Date(2021,8,11,19,0),null,null,null,null)
    expect(game.gameId)
        .toBe('1');
    expect(game.Date)
        .toBe(new Date(2021,8,11,19,0));
    expect(game.Home_team)
        .toBe('Bnie Sakhnin');
    expect(game.Away_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Stadium)
        .toBe('Doha')
    expect(game.RefereeId)
        .toBe('12');
    expect(game.Events)
        .toBe([]);
    expect(game.Result)
        .toBe("0:0");
    
    game = await updateDataGame('2',null,'Tel aviv',null,null,null)
    expect(game.gameId)
        .toBe('2');
    expect(game.Date)
        .toBe(new Date(2021,6,28,19,0));
    expect(game.Home_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Away_team)
        .toBe('Hapoel Tel aviv');
    expect(game.Stadium)
        .toBe('Tel aviv')
    expect(game.RefereeId)
        .toBe('12');
    expect(game.Events)
        .toBe([]);
    expect(game.Result)
        .toBe("0:0");

    game = await updateDataGame('1',null,null,'13',null,null)
    expect(game.gameId)
        .toBe('1');
    expect(game.Date)
        .toBe(new Date(2021,8,11,19,0));
    expect(game.Home_team)
        .toBe('Bnie Sakhnin');
    expect(game.Away_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Stadium)
        .toBe('Doha')
    expect(game.RefereeId)
        .toBe('13');
    expect(game.Events)
        .toBe([]);
    expect(game.Result)
        .toBe("0:0");
    
    game = await updateDataGame('4',null,null,null,'1:0',null)
    expect(game.gameId)
        .toBe('4');
    expect(game.Date)
        .toBe(new Date(2021,8,11,19,0));
    expect(game.Home_team)
        .toBe('Maccabi Haifa');
    expect(game.Away_team)
        .toBe('Hapoel Beer Sheva');
    expect(game.Stadium)
        .toBe('Doha')
    expect(game.RefereeId)
        .toBe('15');
    expect(game.Events)
        .toBe([]);
    expect(game.Result)
        .toBe("1:0");
});


// Referee - Get referee games
test('Referee - Get referee games', async () => {
    const getRefereeGames = function (idReferee) {
        return new Promise(function (resolve, reject) {
            Referee.getMyGames(idReferee, function (games, err) {
                resolve(games)
            });
        });
    }

    let gamesReferee = await getRefereeGames('12')
    expect(gamesReferee[0].gameId)
        .toBe('2');
    

    gamesReferee = await getRefereeGames('13')
    expect(gamesReferee[0].gameId)
        .toBe('1');
    expect(gamesReferee[1])
        .toBe('3');


    gamesReferee = await getRefereeGames('15')
    expect(gamesReferee[0].gameId)
        .toBe('4');

    gamesReferee = await getRefereeGames('14')
    expect(gamesReferee)
        .toBe(null);
});

// Referee - Get all games
test('Referee - Get referee games', async () => {
    const getAllGames = function () {
        return new Promise(function (resolve, reject) {
            Game.getAllGames( function (games, err) {
                resolve(games)
            });
        });
    }

    let games = await getAllGames()
    expect(games[0].gameId)
        .toBe('1');
    expect(games[1].gameId)
        .toBe('2');
    expect(games[2].gameId)
        .toBe('3');
    expect(games[4].gameId)
        .toBe('1');
    expect(games.length)
        .toBe(4)
});