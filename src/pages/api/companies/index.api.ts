// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../db';
import { CompanyRow, UserRow } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const method = req.method;

  switch (method) {
    case 'GET':
      getCompanies(res);
      break;
    case 'POST':
      createCompany(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getCompanies(res: NextApiResponse) {
  db.all('SELECT * FROM companies', [], (err: any, rows: any) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message } as any);
      return;
    }
    res.json(rows);
  });
}

function createCompany(req: NextApiRequest, res: NextApiResponse) {
  const { name, cnpj, address, users } = req.body as CompanyRow;

  if (!name && !cnpj && !address && !users) {
    res
      .status(400)
      .json({ error: 'Please provide name, cnpj, address, users' });
    return;
  }

  db.run(
    'INSERT INTO companies (name, cnpj, address) VALUES (?, ?, ?)',
    [name, cnpj, address],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Erro ao criar a company');
      }

      const companyId = this.lastID;

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

      return res.status(201).json({ message: 'Company criada com sucesso' });
    }
  );
}

// function getUsersByCompanyID(req: NextApiRequest, res: NextApiResponse) {
//   const companyId = req.params.id;

//   db.all(
//     `SELECT users.*
//      FROM users
//      INNER JOIN user_company ON users.id = user_company.user_id
//      WHERE user_company.company_id = ?`,
//     [companyId],
//     (err, rows) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send({ message: 'Erro ao consultar os dados.' });
//       }

//       res.send(rows);
//     }
//   );
// }