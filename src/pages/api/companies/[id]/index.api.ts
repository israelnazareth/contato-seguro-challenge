// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';
import { CompanyRow } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const method = req.method;
  const id = req.query.id as string;

  switch (method) {
    case 'GET':
      getCompanyByID(id, res);
      break;
    case 'PUT':
      updateCompany(id, req, res);
      break;
    case 'DELETE':
      deleteCompany(id, res);
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getCompanyByID(id: string, res: NextApiResponse) {
  db.get('SELECT * FROM companies WHERE id=?', [id], (err: any, row: any) => {
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

function updateCompany(companyId: string, req: NextApiRequest, res: NextApiResponse) {
  const { name, cnpj, address, users } = req.body as CompanyRow;

  if (!name && !cnpj && !address && !users) {
    res
      .status(400)
      .json({ error: 'Please provide name, cnpj, address, users' });
    return;
  }

  db.run(
    'UPDATE companies SET name = ?, cnpj = ?, address = ? WHERE id = ?',
    [name, cnpj, address, companyId],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Erro ao editar a company');
      }

      db.run(
        'DELETE FROM users_companies WHERE company_id = ?',
        [companyId],
        function (err) {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao remover relacionamentos antigos');
          }

          users.forEach((userId) => {
            db.run(
              'INSERT INTO users_companies (user_id, company_id) VALUES (?, ?)',
              [userId, companyId],
              function (err) {
                if (err) {
                  console.error(err.message);
                  return res.status(500).send('Erro ao relacionar usuário com a company');
                }
              }
            );
          });

          return res.status(200).json({ message: 'Company atualizada com sucesso' });
        }
      );
    }
  );
}

function deleteCompany(id: string, res: NextApiResponse) {
  db.run('DELETE FROM companies WHERE id=?', id, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message } as any);
      return;
    }

    db.run(
      'DELETE FROM users_companies WHERE company_id = ?',
      [id],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Erro ao remover relacionamentos antigos');
        }

        return res.status(200).json({ message: 'Company atualizada com sucesso' });
      }
    );

    if (this.changes === 0) {
      res.status(404).json({ error: `Company with id=${id} not found` });
      return;
    }

    res.status(200).json({ success: true });
  });
}