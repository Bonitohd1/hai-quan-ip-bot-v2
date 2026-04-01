import prisma from './lib/prisma';
async function check() {
  const count = await prisma.document.count();
  const hermes = await prisma.document.findMany({ where: { name: { contains: 'Hermes' } } });
  console.log(`Total documents: ${count}`);
  console.log('Hermes documents:', hermes);
  process.exit(0);
}
check();
