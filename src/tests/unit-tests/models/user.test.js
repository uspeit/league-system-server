import UserData from '../../../js/data/user.js'
import User from '../../../js/models/user.js'
import {
    expect,
    test
} from '@jest/globals'

test('User - Login', async () => {
    await UserData.sync({
        force: true
    })
    let entry = await UserData.create({
        username: 'test',
        password: 'qwe123'
    })
    await entry.save();

    let token = await User.login('test', 'qwe123')

    expect(token.sub)
        .toBeGreaterThan(0) // Check we got a valid id

    token = await User.login('test', 'qwe1234')
    expect(token)
        .toBe(null);
});