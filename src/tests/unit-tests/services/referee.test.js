import User from "../../../js/models/user.js";
import { UserService } from "../../../js/services/users.js";
import { RefereeService } from "../../../js/services/referees.js";
import { GameService } from "../../../js/services/referees.js";
import { describe, expect, test, jest } from "@jest/globals";

jest.mock("../../../js/models/user.js");
jest.mock("../../../js/models/referee.js");
jest.mock("../../../js/models/game.js");

describe("Referees Service Unit Tests", () => {
    test("Add referee with referee user", async () => {
        expect.assertions(18);
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
        await UserService.postLogin(login, res);

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
                        expect(resBody.err).toBe("You can't register new referee");
                        expect(User.lastLogin).toStrictEqual({
                            username: "aiman",
                            password: "123",
                        });
                    }
                }
            }
        };
        await RefereeService.postAddReferee(req,res)

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
        await UserService.postLogin(login, res);


        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe('One or more data is missing');
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
        await RefereeService.postAddReferee(req,res)

        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(200);
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
                idNum: '20',
                phone: '054',
                email: 'aa@'
            }
        }
        await RefereeService.postAddReferee(req,res)

        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe('Failed referee user already exists');
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
                first_name:'bb',
                last_name:'bb',
                idNum: '12',
                phone: '054',
                email: 'bb@'
            }
        }
        await RefereeService.postAddReferee(req,res)
    });
});
describe("Referees Service Unit Tests", () => {
    test("Update referee Data", async () => {
        expect.assertions(14);
        
        let req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: null,
                role: 'referee'
            },
            body:{
                first_name:'aab',
                last_name:'aab',
                idNum: '20',
                phone: '054',
                email: 'aab@'
            }
        }
        let res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't update data referee");
                    }
                }
            }
        };
        await RefereeService.putUpdateData(req,res)

        req= {
            user: {
                username:'aiman',
                password:'123',
                idUserNum:'208112557',
                role:'player'
            },
            body:{
                first_name:'aab',
                last_name:'aab',
                idNum: '208112557',
                phone: '054',
                email: 'aab@'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't update data referee");
                    }
                }
            }
        };
        await RefereeService.putUpdateData(req,res)

        req= {
            user: {
                username:'aiman',
                password:'123',
                idUserNum:'208112557',
                role:'referee'
            },
            body:{
                first_name:'aab',
                last_name:'aab',
                idNum: '208112557',
                phone: '054',
                email: 'aab@'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(200);
                        expect(resBody).toBe("Success");
                    }
                }
            }
        };
        await RefereeService.putUpdateData(req,res)

        req= {
            user: {
                username:'aiman',
                password:'123',
                idUserNum:'2081125',
                role:'referee'
            },
            body:{
                first_name:'aab',
                last_name:'aab',
                idNum: '208112557',
                phone: '054',
                email: null
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't update data referee");
                    }
                }
            }
        };
        await RefereeService.putUpdateData(req,res)

        req= {
            user: {
                username:'rep',
                password:'123',
                idUserNum:'123',
                role:'representative'
            },
            body:{
                first_name:'aab',
                last_name:'aab',
                idNum: null,
                phone: '054',
                email: null
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Please enter id num referee.");
                    }
                }
            }
        };
        await RefereeService.putUpdateData(req,res)

        req= {
            user: {
                username:'rep',
                password:'123',
                idUserNum:'123',
                role:'representative'
            },
            body:{
                first_name:'aab',
                last_name:'aab',
                idNum: '208112',
                phone: '054',
                email: null
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Referee id doesn't exist");
                    }
                }
            }
        };
        await RefereeService.putUpdateData(req,res)

        req= {
            user: {
                username:'rep',
                password:'123',
                idUserNum:'123',
                role:'representative'
            },
            body:{
                first_name:'aab',
                last_name:'aab',
                idNum: '208112557',
                phone: '054',
                email: null
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(200);
                        expect(resBody).toBe("Success");
                    }
                }
            }
        };
        await RefereeService.putUpdateData(req,res)
    });
});

describe("Referees Service Unit Tests", () => {
    test("Update Game Data", async () => {
        expect.assertions(12);
        
        let req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: null,
                role: 'Player'
            },
            body:{
                
            }
        }
        let res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't update events game");
                    }
                }
            }
        };
        await RefereeService.postUpdateGame(req,res)

        req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: null,
                role: 'referee'
            },
            body:{
                
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't get data referee");
                    }
                }
            }
        };
        await RefereeService.postUpdateGame(req,res)

        req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '208112557',
                role: 'referee'
            },
            body:{
                
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Please enter a row that you want to change");
                    }
                }
            }
        };
        await RefereeService.postUpdateGame(req,res)

        
        req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '208112557',
                role: 'referee'
            },
            body:{
                row:1
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Please enter a new event");
                    }
                }
            }
        };
        await RefereeService.postUpdateGame(req,res)

        req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: '13',
                role: 'referee'
            },
            body:{
                gameId:1,
                row:1,
                event:'gooal Beer Sheva'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(200);
                        expect(resBody).toBe("Success");
                    }
                }
            }
        };
        await RefereeService.postUpdateGame(req,res)

        req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: '13',
                role: 'referee'
            },
            body:{
                gameId:2,
                row:1,
                event:'gooal Beer Sheva'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't update events game");
                    }
                }
            }
        };
        await RefereeService.postUpdateGame(req,res)
    })
})

describe("Referees Service Unit Tests", () => {
    test("Add events game Data", async () => {
        expect.assertions(10);
        let req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: null,
                role: 'Player'
            },
            body:{
                
            }
        }
        let res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't add events game");
                    }
                }
            }
        };
        await RefereeService.postAddEventsGame(req,res)

        req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: null,
                role: 'referee'
            },
            body:{
                
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't get data referee");
                    }
                }
            }
        };
        await RefereeService.postAddEventsGame(req,res)

        req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: '208112557',
                role: 'referee'
            },
            body:{
                row:1,
                event:'gooal Beer Sheva'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Please enter a game id");
                    }
                }
            }
        };
        await RefereeService.postAddEventsGame(req,res)

        req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: '208112557',
                role: 'referee'
            },
            body:{
                gameId:2,
                row:1,
                event:'gooal Beer Sheva'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Failed");
                    }
                }
            }
        };
        await RefereeService.postAddEventsGame(req,res)

        req= {
            user: {
                username: "aa",
                password: "123",
                idUserNum: '13',
                role: 'referee'
            },
            body:{
                gameId:1,
                row:1,
                event:'gooal Beer Sheva'
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(200);
                        expect(resBody).toBe("Success");
                    }
                }
            }
        };
        await RefereeService.postAddEventsGame(req,res)

    })
})