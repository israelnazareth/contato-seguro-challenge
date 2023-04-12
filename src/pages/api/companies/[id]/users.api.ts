// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const method = req.method;
  const id = req.query.id as string;

  switch (method) {
    case 'GET':
      getUsersByCompanyID(id, res);
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getUsersByCompanyID(id: string, res: NextApiResponse) {
  db.all(
    `SELECT users.*
      FROM users
      INNER JOIN users_companies ON users.id = users_companies.user_id
      WHERE users_companies.company_id = ?`,
    [id],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Erro ao consultar os dados.' });
      }

      res.send(rows);
    }
  );
}

