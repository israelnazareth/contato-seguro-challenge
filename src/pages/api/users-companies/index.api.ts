// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const method = req.method;

  switch (method) {
    case 'GET':
      getUsersCompanies(res);
      break;
    case 'POST':
      createUsersCompanies(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getUsersCompanies(res: NextApiResponse) {
  db.all('SELECT * FROM users_companies', [], (err: any, rows: any) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message } as any);
      return;
    }
    res.json(rows);
  });
}

export function createUsersCompanies(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, company_id } = req.body as any;

  if (!user_id && !company_id) {
    res
      .status(400)
      .json({ error: 'Please provide user_id and company_id' });
    return;
  }

  db.run(
    'INSERT INTO users_companies (user_id, company_id) VALUES (?, ?)',
    [user_id, company_id],
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message } as any);
        return;
      }
      res.status(201).json({ message: 'Relation created successfully' });
    }
  );
}
