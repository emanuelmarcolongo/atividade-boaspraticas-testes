import app from "app";
import prisma from "config/database";
import supertest from "supertest";
import { faker } from '@faker-js/faker';
import consoleFactory from "./factories/console.factories";

beforeAll(async () => {
    await prisma.game.deleteMany({});
    await prisma.console.deleteMany({});
  });


const server = supertest(app);


describe("Console Route Tests", () => {

    it ("get /consoles => should respond with status 200 and array with 0 items", async () => {
        

        const response = await server.get("/consoles");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    })
    

    it ("post /consoles => should respond with status 422 when no body is send", async () => {
        const response = await server.post("/consoles");

        expect(response.status).toBe(422);
    });

    it ("post /consoles => should respond with status 201 when body is send with right format", async () => {
        const body = {
            name: faker.name.middleName()
        }

        const response = await server.post("/consoles").send(body);

        expect(response.status).toBe(201);
    })

    it ("get /consoles => should respond with status 200 and 1 item", async () => {
        

        const response = await server.get("/consoles");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it ("get /consoles/:id => should respond with status 404 when has no console with given id", async () => {
        

        const response = await server.get("/consoles/102931928391283");

        expect(response.status).toBe(404);

    });

    it ("get /consoles/:id => should respond with status 200 and body equals to created console", async () => {
        
        const createdConsole = await consoleFactory.createConsole();
        
        const response = await server.get(`/consoles/${createdConsole.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(createdConsole);
    });

})


