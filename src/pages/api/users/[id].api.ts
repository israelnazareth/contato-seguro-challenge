// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../db';
import { UserModel } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const method = req.method;
  const id = req.query.id as string;

  switch (method) {
    case 'GET':
      getUserByID(id, res);
      break;
    case 'PUT':
      updateUser(id, req, res);
      break;
    case 'DELETE':
      deleteUser(id, res);
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getUserByID(id: string, res: NextApiResponse) {
  db.get('SELECT * FROM users WHERE id=?', [id], (err: any, row: any) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message } as any);
      return;
    }

    if (!row) {
      res.status(404).json({ error: `User with id=${id} not found` });
      return;
    }

    res.json(row);
  });
}

function updateUser(id: string, req: NextApiRequest, res: NextApiResponse) {
  const { name, email, phone, birth_date, city } = req.body as UserModel;

  if (!name && !email && !phone && !birth_date && !city) {
    res.status(400).json({ error: 'Please provide at least one field to update' });
    return;
  }

  db.run(
    'UPDATE users SET name=?, email=?, phone=?, birth_date=?, city=? WHERE id=?',
    [name, email, phone, birth_date, city, id],
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message } as any);
        return;
      }

      if (this.changes === 0) {
        res.status(404).json({ error: `User with id=${id} not found` });
        return;
      }

      res.status(200).json({ success: true });
    }
  );
}

function deleteUser(id: string, res: NextApiResponse) {
  db.run('DELETE FROM users WHERE id=?', id, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message } as any);
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: `User with id=${id} not found` });
      return;
    }

    res.status(200).json({ success: true });
  });
}