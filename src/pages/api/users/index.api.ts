// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../db';
import { UserRow } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const method = req.method;

  switch (method) {
    case 'GET':
      getUsers(res);
      break;
    case 'POST':
      createUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getUsers(res: NextApiResponse) {
  db.all('SELECT * FROM users', [], (err: any, rows: any) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message } as any);
      return;
    }
    res.json(rows);
  });
}

function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, phone, birth_date, city } = req.body as UserRow;

  if (!name && !email && !phone && !birth_date && !city) {
    res
      .status(400)
      .json({ error: 'Please provide name, email, phone, birth_date and city' });
    return;
  }

  db.run(
    'INSERT INTO users (name, email, phone, birth_date, city) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, birth_date, city],
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message } as any);
        return;
      }
      res.json({ id: this.lastID });
    }
  );
}
