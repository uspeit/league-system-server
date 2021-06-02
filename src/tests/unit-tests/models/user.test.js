import UserData from '../../../js/data/user.js'
import User from '../../../js/models/user.js'
import {
    expect,
    test
} from '@jest/globals'

test('Validate user details - Valid Credentials', async () => {
    await UserData.sync({
        force: true
    })
    let entry = await UserData.create({
        username: 'test',
        password: 'qwe123'
    })
    await entry.save();

    let user = new User('test', 'qwe123');
    let res = await user.validate();
    expect(res).toBe(true);
});

test('Validate user details - Invalid Credentials', async () => {
    await UserData.sync({
        force: true
    })
    let entry = await UserData.create({
        username: 'test',
        password: 'qwe123'
    })
    await entry.save();

    let user = new User('test', 'qwe1234');
    let res = await user.validate();
    expect(res).toBe(false);
});