import prisma from "../database/prisma.config";
import { ErrorCodeEnum } from "../enums/error-code.enums";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const createDevisService = async (body: {
  description: string;
  clientId: string;
}) => {
  const { description, clientId } = body;

  //on verifie si le client existe
  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
  });
  if (!existingClient) {
    throw new NotFoundException(
      "Ce client n'existe pas",
      ErrorCodeEnum.RESOURCE_NOT_FOUND,
    );
  }
  //on genere un numero de devis
  const date = new Date();
  let year = date.getFullYear();

  const num = `DEVIS-${existingClient.name.toUpperCase()}/ ${year}-`;

  //**on recupere les devis de ce client
  const clientDevis = await prisma.devis.findMany({
    where: { clientId: clientId },
  });

  //**Si le client n'a pas encore de devis on cree le premier devis */

  if (clientDevis.length === 0) {
    const numDevisClient = `${num}1`;
    //on enregistre le devis du client
    const devis = await prisma.devis.create({
      data: {
        numDevis: numDevisClient,
        total: 0,
        description,
        clientId,
      },
    });
    return devis;
  } else {
    //si le client a deja des devis
    //on recupere le numero du dernier devis
    const lastDevis = await prisma.devis.findMany({
      where: { clientId },
      orderBy: { createAt: "desc" },
      select: { numDevis: true },
      take: 1,
    });

    //on incremente le num du devis recuperer
    const numDevisClient = `${num}${parseInt(lastDevis[0].numDevis[lastDevis[0].numDevis.length - 1]) + 1}`;

    //on cre le devis suivant
    const devis = await prisma.devis.create({
      data: {
        numDevis: numDevisClient,
        total: 0,
        description,
        clientId,
      },
    });
    return devis;
  }
};

export const getDevisService = async (id: string) => {
  const devis = await prisma.devis.findUnique({
    where: { id },
    include: {
      devisItem: {
        select: {
          id: true,
          description: true,
          quantity: true,
          unitePrice: true,
          total: true,
        },
      },
      clientDevis: {
        select: {
          id: true,
          name: true,
          contact: true,
          email: true,
          address: true,
        },
      },
    },
  });
  if (!devis) throw new NotFoundException("Ce devis n'existe pas");
  return devis;
};

export const getAllDevisService = async () => {
  const devis = await prisma.devis.findMany({
    orderBy: { createAt: "desc" },
    include: {
      devisItem: {
        select: {
          description: true,
          quantity: true,
          unitePrice: true,
          total: true,
        },
      },
      clientDevis: {
        select: {
          name: true,
          contact: true,
          email: true,
          address: true,
        },
      },
    },
  });
  if (devis.length === 0) {
    throw new NotFoundException("La base de donnee est vide");
  }
  return devis;
};

export const getAllDevisClientService = async (id: string) => {
  //on verifie si le client existe
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) {
    throw new BadRequestException("ce client n'existe pas");
  }
  // on recupere tout les devis du client

  const devis = await prisma.devis.findMany({
    where: { clientId: id },
    orderBy: { createAt: "desc" },
    include: {
      devisItem: {
        select: {
          description: true,
          quantity: true,
          unitePrice: true,
          total: true,
        },
      },
    },
  });
  if (devis.length === 0) {
    throw new NotFoundException("ce client n'a pas encore de devis");
  }
  return devis;
};

export const updateDevisService = async (
  body: {
    description: string;
    clientId: string;
  },
  id: string,
) => {
  const { description, clientId } = body;

  //on verifie si le devis existe
  const existingDevis = await prisma.devis.findUnique({ where: { id } });
  if (!existingDevis) {
    throw new NotFoundException("Ce devis n'existe pas");
  }

  //on met a jour le devis
  const devis = await prisma.devis.update({
    where: { id },
    data: {
      description,
      clientId,
    },
  });
  return devis;
};

export const deleteDevisService = async (id: string) => {
  //on verifie si le devis existe
  const existingDevis = await prisma.devis.findUnique({ where: { id } });
  if (!existingDevis) {
    throw new NotFoundException("Ce devis n'existe pas");
  }
  //on supprime le devis
  await prisma.devis.delete({ where: { id } });
};
