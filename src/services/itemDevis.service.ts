import prisma from "../database/prisma.config";
import { ErrorCodeEnum } from "../enums/error-code.enums";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const addItemToDevisService = async (
  id: string,
  body: {
    description: string;
    unite: string;
    quantity: number;
    unitePrice: number;
  },
) => {
  const { description, quantity, unite, unitePrice } = body;
  //on verifie si le devis existe
  const existingDevis = await prisma.devis.findUnique({
    where: { id },
  });
  if (!existingDevis) {
    throw new NotFoundException("Ce devis n'existe pas");
  }
  //on calcule le total du devisItem
  const totalItem = quantity * unitePrice;

  //on ajoute l'item au devis
  const devisItem = await prisma.itemsDevis.create({
    data: {
      devisId: id,
      description: description,
      unite: unite,
      quantity: quantity,
      unitePrice: unitePrice,
      total: totalItem,
    },
  });

  //on met a jour le total du devis
  await prisma.devis.update({
    where: { id },
    data: {
      total: existingDevis.total + totalItem,
    },
  });

  return devisItem;
};

export const getAllItemDevisService = async (id: string) => {
  //on verifie si le devis existe
  const existingDevis = await prisma.devis.findUnique({
    where: { id },
  });
  if (!existingDevis) {
    throw new NotFoundException("Ce devis n'existe pas");
  }
  //on recupere tout les items du devis
  const items = await prisma.itemsDevis.findMany({
    where: { devisId: id },
  });
  if (items.length === 0) {
    throw new NotFoundException("Ce devis n'a pas encore d'items");
  }
  return items;
};

export const updateItemDevisService = async (
  id: string,
  body: {
    description: string;
    unite: string;
    quantity: number;
    unitePrice: number;
  },
) => {
  const { description, quantity, unite, unitePrice } = body;

  //on verifie si le devisItem existe
  const existingItem = await prisma.itemsDevis.findUnique({
    where: { id },
  });
  if (!existingItem) {
    throw new NotFoundException("Ce article n'existe pas");
  }

  //on verifie si le devis existe
  const existingDevis = await prisma.devis.findUnique({
    where: { id: existingItem.devisId },
  });
  if (!existingDevis) {
    throw new NotFoundException("Ce devis n'existe pas");
  }

  //on calcule le total du devisItem
  const totalItem = quantity * unitePrice;

  //on met a jour l'item du devis
  const devisItem = await prisma.itemsDevis.update({
    where: { id },
    data: {
      description: description,
      unite: unite,
      quantity: quantity,
      unitePrice: unitePrice,
      total: totalItem,
    },
  });

  //on met a jour le total du devis
  await prisma.devis.update({
    where: { id: existingItem.devisId },
    data: {
      total: existingDevis.total - existingItem.total + totalItem,
    },
  });

  return devisItem;
};

export const deleteItemDevisService = async (id: string) => {
  //on verifie si le devisItem existe
  const existingItem = await prisma.itemsDevis.findUnique({
    where: { id },
  });
  if (!existingItem) {
    throw new NotFoundException("Ce article n'existe pas");
  }

  //on verifie si le devis existe
  const existingDevis = await prisma.devis.findUnique({
    where: { id: existingItem.devisId },
  });
  if (!existingDevis) {
    throw new NotFoundException("Ce devis n'existe pas");
  }

  //on met a jour le total du devis
  await prisma.devis.update({
    where: { id: existingItem.devisId },
    data: {
      total: existingDevis.total - existingItem.total,
    },
  });

  //on supprime l'item du devis
  await prisma.itemsDevis.delete({
    where: { id },
  });
};
