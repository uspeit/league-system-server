import User from "../../../js/models/user.js";
import Referee from "../../../js/models/referee.js"
import { UserService } from "../../../js/services/users.js";
import { RefereeService } from "../../../js/services/referees.js";
import { GameService } from "../../../js/services/games.js";
import { describe, expect, test, jest } from "@jest/globals";
import { RefereeData } from "../../../js/data/referee.js";

jest.mock("../../../js/models/user.js");
jest.mock("../../../js/models/referee.js");
jest.mock("../../../js/models/game.js");

describe("Games Service Unit Tests", () => {
    test("update referee game", async () => {
        expect.assertions(12);

        let req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '208112557',
                role: 'player'
            },
            body:{
                
            }
        }
        let res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't update data game");
                    }
                }
            }
        };
        await GameService.putUpdateRefereeGame(req,res)

        req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '208112557',
                role: 'representative'
            },
            body:{
                Stadium:"Tel Aviv"
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Please enter game id number.");
                    }
                }
            }
        };
        await GameService.putUpdateRefereeGame(req,res)

        req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '208112557',
                role: 'representative'
            },
            body:{
                gameId:10,
                Stadium:"Tel Aviv"
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("Game id doesn't exist");
                    }
                }
            }
        };
        await GameService.putUpdateRefereeGame(req,res)

        req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '208112557',
                role: 'representative'
            },
            body:{
                gameId:1,
                Stadium:"Tel Aviv"
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
        await GameService.putUpdateRefereeGame(req,res)

        req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '208112',
                role: 'referee'
            },
            body:{
                gameId:1,
                Stadium:"Tel Aviv"
            }
        }
        res = {
            status: function (resStatus) {
                return {
                    send: function (resBody) {
                        expect(resStatus).toBe(400);
                        expect(resBody.err).toBe("You can't update data game");
                    }
                }
            }
        };
        await GameService.putUpdateRefereeGame(req,res)

        req= {
            user: {
                username: "aiman",
                password: "123",
                idUserNum: '13',
                role: 'referee'
            },
            body:{
                gameId:1,
                Stadium:"Tel Aviv"
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
        await GameService.putUpdateRefereeGame(req,res)
    })
})