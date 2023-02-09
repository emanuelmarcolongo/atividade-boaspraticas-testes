import { faker } from "@faker-js/faker"
import prisma from "config/database";
import consoleFactory from "./console.factories";


async function createGame() {
  
    const console = await consoleFactory.createConsole();

    const createdGame = await prisma.game.create({
        data: {
            title: faker.name.middleName(),
            consoleId: console.id
        }
    })


    return createdGame;
}

 const gameFactory = {
    createGame
}

export default gameFactory;