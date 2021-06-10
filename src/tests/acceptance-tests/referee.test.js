// we will use supertest to test HTTP requests/responses
import request from "supertest";
// we also need our app for the correct routes!
import app from "../../js/app.js";
import fs from 'fs';
import jwt from "jsonwebtoken";

import { describe, expect, it, beforeAll } from "@jest/globals";
import initDb from "../../js/data/init.js";

const privateKey = fs.readFileSync("keys/private.pem");
let token = jwt.sign({sub:1}, privateKey, {
          algorithm: "RS256",
        });
    describe("Login Use Case", () => {
        // Success
        it("Login Success", async () => {
          await initDb(true);
          const response = await request(app)
            .post("/users/login")
            .send({
              username: "rep",
              password: "123",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
      
          console.log(response.body);
          expect(response.body.token).toEqual(
            expect.stringMatching(
              /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
            )
          );
        })
    })
