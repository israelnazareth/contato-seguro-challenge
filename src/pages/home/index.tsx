import React from "react";
import Head from "next/head";
import Image from "next/image"
import logo from '../../assets/logo.png';
import { initialStateObj, useMyContext } from "@/contexts/context";
import { Plus } from "@phosphor-icons/react";
import { ModalContactData } from "@/components/ModalContactData";
import { TableContactData } from "@/components/TableContactData";
import { Container, Fields, Main } from "./styles";

export default function Home() {
  const {
    inputValue, setInputValue,
    setModalContactIsOpen,
    setSelectedOption,
    setContactObject,
  } = useMyContext()

  function handleInsertNewContact() {
    setModalContactIsOpen(true);
    setContactObject(initialStateObj);
  }

  return (
    <>
      <Head>
        <title>Contato Seguro - Canal de Ética</title>
      </Head>
      <Main>
        <Container>
          <ModalContactData />
          <Image src={logo} alt='' priority />
          <Fields>
            <button onClick={handleInsertNewContact}>
              <Plus color="#FFF" size={26} weight="bold" />
            </button>
            <input
              type="search"
              placeholder="Buscar..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <select onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="name">Nome</option>
              <option value="email">Email</option>
              <option value="phone">Telefone</option>
              <option value="birth_date">Nascimento</option>
              <option value="city">Cidade</option>
            </select>
          </Fields>
          <TableContactData />
        </Container>
      </Main >
    </>
  )
}
