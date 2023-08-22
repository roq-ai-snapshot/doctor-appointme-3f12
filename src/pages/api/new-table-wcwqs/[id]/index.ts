import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { newTableWcwqValidationSchema } from 'validationSchema/new-table-wcwqs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.new_table_wcwq
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getNewTableWcwqById();
    case 'PUT':
      return updateNewTableWcwqById();
    case 'DELETE':
      return deleteNewTableWcwqById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getNewTableWcwqById() {
    const data = await prisma.new_table_wcwq.findFirst(convertQueryToPrismaUtil(req.query, 'new_table_wcwq'));
    return res.status(200).json(data);
  }

  async function updateNewTableWcwqById() {
    await newTableWcwqValidationSchema.validate(req.body);
    const data = await prisma.new_table_wcwq.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteNewTableWcwqById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.new_table_wcwq.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
