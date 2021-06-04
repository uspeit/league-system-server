import {
    UserData
} from '../../../js/data/user.js'
import User from '../../../js/models/user.js'
import {
    expect,
    test
} from '@jest/globals'


beforeEach(async () => {
    await UserData.sync({
        force: true
    })
    let entry = await UserData.create({
        username: 'test',
        password: 'qwe123',
        email: 'test@mail.com'
    })

    await entry.save();

    entry = await UserData.create({
        username: 'test2',
        password: '123qwe',
        email: 'test2@mail.com'
    })

    await entry.save();
});

// User - Register
test('User - Register', async () => {
    let user = await UserData.findOne({
        where: {
            username: 'test3'
        }
    });
    expect(user)
        .toBe(null)

    let result = await User.register('test3', 'asdzxc', 'test3@mail.com')
    user = await UserData.findOne({
        where: {
            username: 'test3'
        }
    });

    expect(result)
        .toBe(true);
    expect(user)
        .not.toBe(null);
    expect(user.username)
        .toBe('test3');
    expect(user.password)
        .toBe('asdzxc');
    expect(user.email)
        .toBe('test3@mail.com')


    result = await User.register('test3', 'asdzxc', 'test3@mail.com');
    expect(result)
        .toBe(false);

    result = await User.register('test2', 'asdzxc', 'aa@mail.com');
    expect(result)
        .toBe(false);

    result = await User.register('test', 'asdzxc', 'bb@mail.com');
    expect(result)
        .toBe(false);

    result = await User.register('aaaaaa', 'asdzxc', 'test@mail.com');
    expect(result)
        .toBe(false);

    result = await User.register('bbbbbbb', 'asdzxc', 'test2@mail.com');
    expect(result)
        .toBe(false);
});

// User - Login
test('User - Login', async () => {
    let token = await User.login('test', 'qwe123')
    // Pass
    expect(token.sub)
        .toBeGreaterThan(0) // Check we got a valid id
    // Fail
    token = await User.login('test', 'qwe1234')
    expect(token)
        .toBe(null);
});

// User - Get by ID
test('User - Get by ID', async () => {
    const getByIdAsync = function (id) {
        return new Promise(function (resolve, reject) {
            User.getById(id, function (user, err) {
                resolve(user)
            });
        });
    }

    let user = await getByIdAsync(1)
    expect(user.username)
        .toBe('test');
    expect(user.password)
        .toBe('qwe123');
    expect(user.email)
        .toBe('test@mail.com');

    user = await getByIdAsync(2)
    expect(user.username)
        .toBe('test2');
    expect(user.password)
        .toBe('123qwe');
    expect(user.email)
        .toBe('test2@mail.com');

    user = await getByIdAsync(3)
    expect(user)
        .toBe(null);

    user = await getByIdAsync(null)
    expect(user)
        .toBe(null);
});