import RefereeData from '../../../js/data/referee.js'
import {
    checkUserCredentials,
    UserData
} from '../../../js/data/user.js'
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

// User DB - Username or Email Exists
test('User - Exists', async () => {
    // Pass
    expect(await Referee.getById('951'))
        .toBe(true);
    expect(await checkUserCredentials('test', null))
        .toBe(true);
    expect(await checkUserCredentials(null, 'test@mail.com'))
        .toBe(true);
    expect(await checkUserCredentials('test2', 'test2@mail.com'))
        .toBe(true);
    expect(await checkUserCredentials('test2', null))
        .toBe(true);
    expect(await checkUserCredentials(null, 'test2@mail.com'))
        .toBe(true);
    expect(await checkUserCredentials('test', 'test2@mail.com'))
        .toBe(true);
    expect(await checkUserCredentials('test2', 'test@mail.com'))
        .toBe(true);
    // Fail
    expect(await checkUserCredentials(null, null))
        .toBe(false);
    expect(await checkUserCredentials('test3', null))
        .toBe(false);
    expect(await checkUserCredentials(null, 'test3@mail.com'))
        .toBe(false);
    expect(await checkUserCredentials('test3', 'test3@mail.com'))
        .toBe(false);
});