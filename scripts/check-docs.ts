import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const count = await prisma.document.count();
  console.log(`CURRENT_COUNT: ${count}`);
  
  const hermes = await prisma.document.findMany({
    where: {
      OR: [
        { name: { contains: 'Hermes' } },
        { name: { contains: 'hermes' } }
      ]
    }
  });
  console.log(`HERMES_DOCS: ${hermes.length}`);
  hermes.forEach(h => console.log(` - ${h.code}: ${h.name} (${h.filename})`));
}

check().finally(() => prisma.$disconnect());
