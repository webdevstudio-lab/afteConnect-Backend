import prisma from "../database/prisma.config";
import { ErrorCodeEnum } from "../enums/error-code.enums";
import { BadRequestException, NotFoundException } from "../utils/appError";
import { hashValue } from "../utils/bcrypt";

export const getUserService = async (id: string) => {
  if (!id) {
    throw new BadRequestException("L'id de l'utilisateur est requis");
  }
  //on recupere les sur l'utilisateur
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      fullname: true,
      poste: true,
      role: true,
      Session: true,
    },
  });

  if (!user) {
    throw new NotFoundException(
      "Cet Utilisateur n'existe pas",
      ErrorCodeEnum.AUTH_USER_NOT_FOUND,
    );
  }

  return {
    user,
  };
};

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      fullname: true,
      poste: true,
      role: true,
      isActivate: true,
      Session: true,
    },
  });
  if (users.length === 0) {
    throw new NotFoundException(
      "La basse de donnee est vide",
      ErrorCodeEnum.AUTH_USER_NOT_FOUND,
    );
  }

  return { users };
};

export const updateUserService = async (body: any, id: string) => {
  const { fullname, poste, role, isActive } = body;
  if (!id) {
    throw new BadRequestException("L'id de l'utilisateur est requis");
  }

  const user = await prisma.user.findUnique({ where: { id } });

  //on verifie si l'utilisateur existe
  if (!user) {
    throw new NotFoundException(
      "Cet Utilisateur n'existe pas",
      ErrorCodeEnum.AUTH_USER_NOT_FOUND,
    );
  }

  //on met a jour les informations de l'utilisateur

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      fullname,
      poste,
      role,
      isActivate: isActive,
    },
    select: {
      id: true,
      fullname: true,
      poste: true,
      role: true,
      isActivate: true,
    },
  });

  //on réinitialise le le mot de passe si y il a un demande
  if (updatedUser.isActivate === false) {
    //on hash le mot de passe par default
    const hashedPassword = await hashValue("afte0000", 10);
    //on met a jour le mot de passe
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  return { updatedUser };
};

export const resetUserPasswordService = async (id: string) => {
  const password = "afte0000";
  if (!id) {
    throw new BadRequestException("L'id de l'utilisateur est requis");
  }
  //on recupere les sur l'utilisateur
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      isActivate: true,
    },
  });

  //on met a jour le mot de passe et le status de l'utilisateur
  //On hash le mot de passe
  const hashedPassword = await hashValue(password);

  //on met a jour le mot de passe
  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword, isActivate: false },
  });
};

export const deleteUserService = async (id: string) => {
  if (!id) {
    throw new BadRequestException("L'id de l'utilisateur est requis");
  }
  //on recupere les sur l'utilisateur
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException(
      "Cet Utilisateur n'existe pas",
      ErrorCodeEnum.AUTH_USER_NOT_FOUND,
    );
  }

  //on supprime l'utilsateur

  await prisma.user.delete({ where: { id } });

  return { user };
};
