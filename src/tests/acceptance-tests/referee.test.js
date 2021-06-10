// we will use supertest to test HTTP requests/responses
import request from "supertest";
// we also need our app for the correct routes!
import app from "../../js/app.js";

import { describe, expect, it, beforeAll } from "@jest/globals";
import initDb from "../../js/data/init.js";

import jwt from "jsonwebtoken";
import fs from "fs";

const privateKey = fs.readFileSync("keys/private.pem");
describe("Game Use Case", () => {
  // Success
  it("Add Result Success", async () => {
    await initDb(true);
    let token = jwt.sign({sub:1}, privateKey, {
        algorithm: "RS256",
      });
    const response = await request(app)
      .put("/games/updateRefereeGame")
      .send({
        gameId:2,
        Result:"1:0",
        Date:null,
        Stadium:null,
        RefereeId:'12',
      })
      .set("Authorization","bearer "+token)
      .expect(200)
      
    console.log(response.body);
  });

  it("Add Result Failed", async () => {
    await initDb(true);
    let token = jwt.sign({sub:2}, privateKey, {
        algorithm: "RS256",
      });
    const response = await request(app)
      .put("/games/updateRefereeGame")
      .send({
        gameId:1,
        Result:"1:0",
        Date:null,
        Stadium:null,
        RefereeId:'12',
      })
      .set("Authorization","bearer "+token)
      .expect(400)
      
    console.log(response.body);
  });
  it("Add Result Failed without token", async () => {
    await initDb(true);
    const response = await request(app)
      .put("/games/updateRefereeGame")
      .send({
        gameId:2,
        Result:"1:0",
        Date:null,
        Stadium:null,
        RefereeId:'12',
      })
      .expect(401)
    console.log(response.body);
  });
});

describe("Referee Use Case", () => {
    // Success
    it("Add Event Success", async () => {
        await initDb(true);
        let token = jwt.sign({sub:2}, privateKey, {
          algorithm: "RS256",
        });
      const response = await request(app)
        .post("/referees/addEventsGame")
        .send({
          gameId:2,
          role:'referee',
          RefereeId:'12',
          idUserNum:'12',
          event:'Gooal !!!'
        })
        .set("Authorization","bearer "+token)
        .expect(400)
        
      console.log(response.body);
    });
  });