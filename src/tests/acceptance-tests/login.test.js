// we will use supertest to test HTTP requests/responses
import request from "supertest";
// we also need our app for the correct routes!
import server from "../../js/server.js";

import { describe, expect, it, jest } from "@jest/globals";

describe("Login Use Case", () => {
  it("Representative Login", async () => {
    const response = await request(server)
      .post("/users/login")
      .send({
        username: "rep",
        password: "123",
      })
      .set("Accept", "application/json");
    // .expect("Content-Type", /json/)
    // .expect(200)

    expect(response.body.token).toEqual(
      expect.stringMatching(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      )
    );
  });
});
