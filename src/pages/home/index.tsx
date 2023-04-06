import Image from "next/image"
import logo from '../../assets/logo.png';
import { Plus } from "@phosphor-icons/react";
import { Container, Fields, Main, Table } from "./styles"
import { useState } from "react";

export default function Home() {
  return (
    <>
      <Main>
        <Container>
          <Image src={logo} alt='' />
          <Fields>
            <button>
              <Plus color="#FFF" size={26} weight="bold" />
            </button>
            <input
              type="search"
              placeholder="Buscar..."
            />
            <select>
              <option>Nome</option>
              <option>Email</option>
              <option>Telefone</option>
              <option>Nascimento</option>
              <option>Cidade</option>
            </select>
          </Fields>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Nascimento</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map(() => (
                <>
                  <tr>
                    <td>Fulano</td>
                    <td>fulano@tal.com.br</td>
                    <td>(12) 3456-7890</td>
                    <td>01/01/1990</td>
                    <td>Rio de Janeiro</td>
                  </tr>
                  <tr>
                    <td>Beltrano</td>
                    <td>beltrano@tal.com.br</td>
                    <td>(12) 3456-7890</td>
                    <td>01/01/1990</td>
                    <td>Rio de Janeiro</td>
                  </tr>
                  <tr>
                    <td>Cicrano</td>
                    <td>cicrano@tal.com.br</td>
                    <td>(12) 3456-7890</td>
                    <td>01/01/1990</td>
                    <td>Rio de Janeiro</td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </Container>
      </Main >
    </>
  )
}
