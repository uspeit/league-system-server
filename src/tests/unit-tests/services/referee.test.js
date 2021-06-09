import User from "../../../js/models/user.js";
import Referee from "../../../js/models/referee.js"
import { postLogin, postSignup } from "../../../js/services/users.js";
import { postUpdateGame, postAddReferee,postAddEventsGame,getRefereeGames,putUpdateData } from "../../../js/services/referees.js";
import { putUpdateRefereeGame } from "../../../js/services/games.js";
import { describe, expect, test, jest } from "@jest/globals";

jest.mock("../../../js/models/user.js");
jest.mock("../../../js/models/referee.js");
jest.mock("../../../js/models/game.js");

describe("Users Service Unit Tests", () => {
    test("Add referee with referee user Route(failed)", async () => {
        expect.assertions(12);
        let res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(200);
                        expect(resBody.err).toBe(undefined);
                        expect(User.lastLogin).toStrictEqual({
                            username: "aiman",
                            password: "123",
                        });
                        
                    }
                }
            }
        };
        let login = {
            body: {
              username: "aiman",
              password: "123",
              role: 'referee'
            },
        };
        await postLogin(login, res);

        let req= {
            user: login.body,
            body:{
                first_name:'sa',
                last_name:'ah',
                idNum: '13',
                phone: '054',
                email: 'sa@'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody).toBe("You can't register new referee");
                        expect(User.lastLogin).toStrictEqual({
                            username: "aiman",
                            password: "123",
                        });
                    }
                }
            }
        };
        await postAddReferee(req,res)

        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(200);
                        expect(resBody.err).toBe(undefined);
                        expect(User.lastLogin).toStrictEqual({
                            username: "rep",
                            password: "123",
                        });
                        
                    }
                }
            }
        }
        login = {
            body: {
              username: "rep",
              password: "123",
              role: 'representative'
            },
        };
        await postLogin(login,res)


        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody).toBe('One or more data is missing');
                        expect(User.lastLogin).toStrictEqual({
                            username: "rep",
                            password: "123",
                        });
                    }
                }
            }
        }
        req= {
            user: login.body
            ,
            body:{
                first_name:'sa',
                last_name:'ah',
                idNum: '12',
                phone: '054',
                email: null
            }
        }
        await postAddReferee(req,res)

        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody).toBe('Success');
                        expect(User.lastLogin).toStrictEqual({
                            username: "rep",
                            password: "123",
                        });
                    }
                }
            }
        }
        req= {
            user: login.body
            ,
            body:{
                first_name:'aa',
                last_name:'aa',
                idNum: '13',
                phone: '054',
                email: 'aa@'
            }
        }
        await postAddReferee(req,res)
    });
});
