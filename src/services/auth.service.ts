import prisma from "../database/prisma.config";
import { ErrorCodeEnum } from "../enums/error-code.enums";
import { BadRequestException, NotFoundException } from "../utils/appError";
import { compareValue, hashValue } from "../utils/bcrypt";
import { generateAllTokens } from "../utils/jwt";

export const registerUserService = async (body: {
  fullname: string;
  email: string;
  password: string;
  poste: string;
}) => {
  const { fullname, email, password, poste } = body;

  //on verifie si l'utilisateur existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new BadRequestException(
      "cette addresse email est utilisé par un autre compte",
      ErrorCodeEnum.AUTH_EMAIL_ALREADY_EXISTS,
    );
  }

  //On hash le mot de passe
  const hashedPassword = await hashValue(password);

  //on cree l'utilisateur
  const neuwUser = await prisma.user.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
      poste,
    },
  });

  //On retoune l'utilisateur
  return {
    user: {
      id: neuwUser.id,
      fullname: neuwUser.fullname,
      email: neuwUser.email,
      poste: neuwUser.poste,
      role: neuwUser.role,
    },
  };
};

export const loginUserService = async (body: {
  email: string;
  password: string;
  userAgent?: string;
}) => {
  const { email, password, userAgent } = body;

  //on verifie si l'utilisateur existe

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new BadRequestException(
      "L'email ou le mot de passe est incorrect",
      ErrorCodeEnum.AUTH_INVALID_CREDENTIALS,
    );
  }

  //on compare les mot de passes
  const isPasswordCorrect = await compareValue(password, user.password);
  if (!isPasswordCorrect) {
    throw new BadRequestException(
      "L'email ou le mot de passe est incorrect",
      ErrorCodeEnum.AUTH_INVALID_CREDENTIALS,
    );
  }

  //on enregistre la session de l'utilisateur
  const session = await prisma.session.findFirst({
    where: { userId: user.id },
  });

  if (session) {
    if (session.userAgent === userAgent) {
      await prisma.session.update({
        where: { id: session.id },
        data: {
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });
    }
    //on met a jour la derniere connexion
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    });

    //on set le access token
    const token = generateAllTokens(user.id, session.id, user.role, user.poste);

    //on retourne l'utilisateur
    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        poste: user.poste,
        role: user.role,
        isActivate: user.isActivate,
      },
      token,
    };
  } else {
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        userAgent,
      },
    });

    //on met a jour la derniere connexion
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    });

    //on set le access token
    const token = generateAllTokens(user.id, session.id, user.role, user.poste);

    //on retourne l'utilisateur
    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        poste: user.poste,
        role: user.role,
        isActivate: user.isActivate,
      },
      token,
    };
  }
};

export const activeUserService = async (body: {
  password: string;
  userId: string;
}) => {
  const { password } = body;
  const userId = body.userId;

  //on veririfie si l'utilisateur existe
  const existingUser = await prisma.user.findUnique({ where: { id: userId } });

  if (!existingUser) {
    throw new NotFoundException(
      "L'utilisateur n'existe pas",
      ErrorCodeEnum.AUTH_USER_NOT_FOUND,
    );
  }

  //on hash le mot de passe
  const hashedPassword = await hashValue(password);

  //on verifie si les mot de passe match
  const isPasswordCorrect = await compareValue(password, existingUser.password);
  if (isPasswordCorrect) {
    throw new BadRequestException(
      "Vous ne pouvez pas utiliser le mot de passe par default",
      ErrorCodeEnum.AUTH_INVALID_CREDENTIALS,
    );
  }

  //on met a jour le mot de passe
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      isActivate: true,
      passUpdateAt: new Date(),
    },
  });
  return {
    user: {
      id: updatedUser.id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      poste: updatedUser.poste,
      role: updatedUser.role,
      isActivate: updatedUser.isActivate,
    },
  };
};
