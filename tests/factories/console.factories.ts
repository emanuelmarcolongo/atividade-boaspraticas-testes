import { faker } from "@faker-js/faker"
import prisma from "config/database";


async function createConsole() {
    const name= faker.name.middleName()
    

    const createdConsole = await prisma.console.create({
        data: {
            name
        }
    })

    return createdConsole;
}

 const consoleFactory = {
    createConsole
}

export default consoleFactory;