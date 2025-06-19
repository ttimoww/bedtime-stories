import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // First, delete all existing data
    console.log("Cleaning up existing data...");
    await prisma.story.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log("Creating new data...");
    // Create categories
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                name: "Bedtime Stories",
                ageRange: "3-5 years",
                theme: "Sleep & Dreams",
                length: "Short",
            },
        }),
        prisma.category.create({
            data: {
                name: "Adventure Stories",
                ageRange: "6-8 years",
                theme: "Adventure",
                length: "Medium",
            },
        }),
        prisma.category.create({
            data: {
                name: "Fairy Tales",
                ageRange: "4-7 years",
                theme: "Fantasy",
                length: "Medium",
            },
        }),
        prisma.category.create({
            data: {
                name: "Educational Stories",
                ageRange: "5-8 years",
                theme: "Learning",
                length: "Short",
            },
        }),
    ]);

    console.log("Created categories:", categories);

    // Create a test user
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@example.com",
            stories: {
                create: [
                    {
                        title: "The Sleepy Dragon",
                        content: "Once upon a time, there was a dragon who loved to sleep...",
                        childName: "Alex",
                        categories: {
                            connect: [
                                { name: "Bedtime Stories" },
                                { name: "Fairy Tales" },
                            ],
                        },
                    },
                    {
                        title: "The Magic School Bus",
                        content: "Today was a special day at school...",
                        childName: "Emma",
                        categories: {
                            connect: [
                                { name: "Educational Stories" },
                                { name: "Adventure Stories" },
                            ],
                        },
                    },
                ],
            },
        },
        include: {
            stories: {
                include: {
                    categories: true,
                },
            },
        },
    });

    console.log("Created test user with stories:", user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 