import {
    UserData
} from '../../../js/data/user.js'
import RefereeData from '../../../js/data/referee.js'
import Referee from '../../../js/models/referee.js'
import {
    expect,
    test
} from '@jest/globals'

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

