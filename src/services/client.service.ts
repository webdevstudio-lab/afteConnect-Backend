import prisma from "../database/prisma.config";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const registerClientService = async (body: {
  name: string;
  contact: string;
  email: string;
  address: string;
  type: string;
  description: string;
}) => {
  let { name, email, contact, address, type, description } = body;

  if (!address) {
    address = "N/A";
  }
  if (!email) {
    email = "N/A";
  }
  if (!contact) {
    contact = "N/A";
  }
  if (!description) {
    description = "Aucune information sur ce client";
  }

  //on verifie si le client existe
  const existingClient = await prisma.client.findUnique({ where: { name } });
  if (existingClient) {
    throw new BadRequestException("ce client est deja enregistre");
  }

  //on cree le client
  const neuwClient = await prisma.client.create({
    data: {
      name,
      email,
      contact,
      address,
      type,
      description,
    },
  });

  //On retoune l'utilisateur
  return {
    client: {
      id: neuwClient.id,
      name: neuwClient.name,
      email: neuwClient.email,
      contact: neuwClient.contact,
      address: neuwClient.address,
      type: neuwClient.type,
      description: neuwClient.description,
    },
  };
};

export const getAllClientService = async () => {
  const clients = await prisma.client.findMany();
  if (clients.length === 0)
    throw new NotFoundException("La base de donnee est vide");
  return { clients };
};

export const getClientService = async (id: string) => {
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) throw new NotFoundException("Ce client n'existe pas");
  return { client };
};

export const updateClientService = async (
  body: {
    name: string;
    contact: string;
    email: string;
    address: string;
    type: string;
    description: string;
  },
  id: string,
) => {
  const { name, email, contact, address, type, description } = body;

  //on verifie si le client existe
  const existingClient = await prisma.client.findUnique({ where: { id } });
  if (!existingClient) {
    throw new NotFoundException("Ce client n'existe pas");
  }

  //on met a jour les informations sur le client
  const client = await prisma.client.update({
    where: { id },
    data: {
      name,
      email,
      contact,
      address,
      type,
      description,
    },
  });

  //On retoune l'utilisateur
  return { client };
};

export const deleteClientService = async (id: string) => {
  //on verifie si le client existe
  const existingClient = await prisma.client.findUnique({ where: { id } });
  if (!existingClient) {
    throw new NotFoundException("Ce client n'existe pas");
  }

  //on supprime le client
  await prisma.client.delete({ where: { id } });
};
