import RefereeData from '../../../js/data/referee.js'
import {
    checkUserCredentials,
    UserData
} from '../../../js/data/user.js'
import User from '../../../js/models/user.js'
import Referee from '../../../js/models/referee.js'
import Game from '../../../js/models/game.js'
import GameData from '../../../js/data/game.js'

import {
    expect,
    test,
    jest
} from '@jest/globals'

jest.mock('../../../js/data/user.js');
jest.mock('../../../js/data/referee.js');
jest.mock('../../../js/data/game.js');

beforeEach(async () => {
    //await UserData.sync({
    //    force: true
    //})
    //await RefereeData.sync({
    //    force:true
    //})
    //await GameData.sync({
    //    force:true
    //})
    
    //let referee = await RefereeData.create({
    //    first_name:'moshe',
    //    last_name:'levi',
    //    idNum:'1',
    //    phone:'123456',
    //    email: 'moshe@'
    //})
    //await referee.save()
//
    //let entry = await UserData.create({
    //    username: 'aiman',
    //    password: '123',
    //    email: 'aiman@',
    //    role: 'referee'
    //})
    //await entry.save();

    let entry = await UserData.create({
        username: 'rep',
        password: '123',
        idUserNum: '123',
        email: 'rep@mail.com',
        role: 'representative'
    })
    await entry.save();
});

test('Referee - Exists', async () => {    
    expect(await checkUserCredentials('aiman', 'aiman@'))
        .toBe(true);
    expect(await checkUserCredentials('rep', 'rep@mail.com'))
        .toBe(true);
});