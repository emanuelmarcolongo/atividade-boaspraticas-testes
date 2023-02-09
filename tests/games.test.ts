import app from "app";
import prisma from "config/database";
import supertest from "supertest";
import { faker } from '@faker-js/faker';
import gameFactory from "./factories/game.factories";
import consoleFactory from "./factories/console.factories";

beforeAll(async () => {
    await prisma.game.deleteMany({});
    await prisma.console.deleteMany({});
  });


const server = supertest(app);


describe("Games Route Test", () => {
    it ("get /games => should respond with status 200 and 0 items when no game is created", async () => {
        const response = await server.get("/games");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });


    it ("get /games/:id => should respond with status 404 when has no game with given id", async () => {
        const response = await server.get("/games/1");

        expect(response.status).toBe(404);
    });

    it ("get /games/:id => should respond with status 200 when find game with given id", async () => {
        
        const createdGame = await gameFactory.createGame();

        const response = await server.get(`/games/${createdGame.id}`)
       
        expect(response.status).toBe(200);
        expect(response.body).toEqual(createdGame);
    });

    it ("post /games/ => should respond with status 422 when invalid body is send", async () => {

        const response = await server.post(`/games`).send()

        expect(response.status).toBe(422);
      
    });

    it ("post /games/ => should respond with status 201 when valid body is send", async () => {

        const createdConsole = await consoleFactory.createConsole();

        const body = {
            title: faker.name.middleName(),
            consoleId:  createdConsole.id
        }

        const response = await server.post(`/games`).send(body);

        expect(response.status).toBe(201);
      
    });

    it ("get /games => should respond with status 200 and 2 items after creating two games", async () => {
        const response = await server.get("/games");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
})