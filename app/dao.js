import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getInstallation(shopifyClientId, shopifyAppUrl) {
  const installation = await prisma.installations.upsert({
    where: {
      shopifyClientId: shopifyClientId,
    },
    update: {},
    create: {
      shopifyClientId: shopifyClientId,
      shopifyAppUrl: shopifyAppUrl,
    },
  });

  return installation;
}

export async function getSocialNetwork(name) {
  const socialNetwork = await prisma.socialNetworks.findUnique({
    where: {
      name: name,
    },
  });
  return socialNetwork;
}

export async function saveLongLivedToken(
  longLivedToken,
  installations_id,
  socialNetworks_id,
  userId
) {
  const installations_SocialNetwork = await prisma.installations_SocialNetworks.upsert({
    where: {
      likeId: {
        installations_id: installations_id,
        socialNetworks_id: socialNetworks_id,
      },
    },
    update: { token: longLivedToken, createdAt: new Date().toISOString() },
    create: {
      installations_id: installations_id,
      socialNetworks_id: socialNetworks_id,
      token: longLivedToken,
      userId: userId,
    },
  });

  return installations_SocialNetwork;
}

export async function saveLongLivedTokenToLatest(longLivedToken) {
  const latestRow = await prisma.installations_SocialNetworks.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestRow) {
    throw new Error("No rows found.");
  }

  const installations_SocialNetwork = await prisma.installations_SocialNetworks.update({
    where: {
      id: latestRow.id,
    },
    data: { token: longLivedToken, createdAt: new Date().toISOString() },
  });

  return installations_SocialNetwork;
}
