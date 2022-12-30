import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy pet
  const pet1 = await prisma.pet.create({
   data: {
    name: 'Bentot/Dog',
      owner: {
        create: {
          name: 'Jerome Villaruel'
        }
      }
   }
  });

  const pet2 = await prisma.pet.create({
    data: {
     name: 'Chuckie/Dog',
       owner: {
         create: {
           name: 'Richlyn Hermosilla'
         }
       }
    }
   });

  console.log({ pet1, pet2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });