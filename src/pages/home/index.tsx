import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image"
import logo from '../../assets/logo.png';
import { initialStateObj, initialStateObjCompany, useMyContext } from "@/contexts/context";
import { Plus } from "@phosphor-icons/react";
import { ModalContactData } from "@/components/ModalContactData";
import { TableContactData } from "@/components/TableContactData";
import { Container, Fields, Header, Main } from "./styles";
import { TableCompaniesData } from "@/components/TableCompaniesData";
import { ModalCompaniesData } from "@/components/ModalCompaniesData";

export default function Home() {
  const [table, setTable] = useState('users')

  const {
    inputValue, setInputValue,
    setModalIsOpen, setSelectedOption,
    setContactObject, setCompanyObject,
    setCompanyID
  } = useMyContext()

  function handleInsertNewContact() {
    setModalIsOpen(true);
    setContactObject(initialStateObj);
    setCompanyObject(initialStateObjCompany);
    setCompanyID(0);
  }

  function handleTable() {
    table === 'users' ? setTable('companies') : setTable('users')
  }

  return (
    <>
      <Head>
        <title>Contato Seguro - Canal de Ética</title>
      </Head>
      <Main>
        <Container>
          <Header>
            <Image data-test-id="logo" src={logo} alt='' priority />
            <div>
              <strong>Visualizar:</strong>
              <button type="button" onClick={handleTable}>
                {table === 'users' ? 'Empresas' : 'Usuários'}
              </button>
            </div>
          </Header>
          <Fields>
            <button onClick={handleInsertNewContact}>
              <Plus data-test-id="insert-icon" color="#FFF" size={26} weight="bold" />
            </button>
            <input
              type="search"
              placeholder="Buscar..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <select onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="name">Nome</option>
              {table === 'users' ?
                <>
                  <option value="email">Email</option>
                  <option value="phone">Telefone</option>
                  <option value="birth_date">Nascimento</option>
                  <option value="city">Cidade</option>
                </> :
                <>
                  <option value="cnpj">CNPJ</option>
                  <option value="address">Endereço</option>
                  {/* <option value="users">Usuários</option> */}
                </>
              }
            </select>
          </Fields>
          {table === 'users' ?
            <>
              <ModalContactData />
              <TableContactData />
            </> :
            <>
              <ModalCompaniesData />
              <TableCompaniesData />
            </>
          }
        </Container>
      </Main >
    </>
  )
}
