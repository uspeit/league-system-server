// we will use supertest to test HTTP requests/responses
import request from "supertest";
// we also need our app for the correct routes!
import app from "../../js/app.js";

import { describe, expect, it, beforeAll } from "@jest/globals";
import initDb from "../../js/data/init.js";

