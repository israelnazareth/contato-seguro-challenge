import React, { useState } from "react";
import Modal from 'react-modal';
import Image from "next/image"
import logo from '../../assets/logo.png';
import data from '../../data/data.json';
import { PencilSimpleLine, Plus, Trash, X } from "@phosphor-icons/react";
import {
  Container,
  Fields,
  ModalHeader,
  Main,
  Table,
  ModalForm,
  ModalFormButtons,
  PhoneAndBirthday,
  modalStyle,
  ModalConfirmButtons,
  ModalConfirmContainer
} from "./styles"
import Head from "next/head";

interface ObjDataTypes {
  name: string,
  email: string,
  phone: string,
  birthday: string,
  city: string
}

const initialStateObj: ObjDataTypes = {
  name: '',
  email: '',
  birthday: '',
  city: '',
  phone: ''
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [modalContactIsOpen, setModalContactIsOpen] = useState(false);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('name');
  const [contactObject, setContactObject] = useState(initialStateObj);
  const [contactPosition, setContactPosition] = useState<number | null>(null);

  const filteredObj = inputValue.length > 0 ?
    data.filter(item => (
      item[selectedOption as keyof ObjDataTypes].toLowerCase()
        .includes(inputValue.toLowerCase()))
    ) : data

  function handleInsertNewContact() {
    setModalContactIsOpen(true);
    setContactObject(initialStateObj);
    setContactPosition(null);
  }

  function handleEditButton(obj: ObjDataTypes, index: number) {
    setModalContactIsOpen(true);
    setContactObject(obj);
    setContactPosition(index);
  }

  function handleEditContact(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setContactObject(prevState => ({ ...prevState, [name]: value }))
  }

  function handleClearFields(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setContactObject(initialStateObj)
  }

  function handleSendConfirm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (contactPosition !== null) {
      filteredObj[contactPosition] = contactObject;
      setContactPosition(null);
    } else {
      filteredObj.push(contactObject)
    }
    setModalContactIsOpen(false);
  }

  function handleRemoveContact(index: number) {
    setModalConfirmIsOpen(true)
    setContactPosition(index);
  }

  function handleConfirmDelete() {
    filteredObj.splice(contactPosition!, 1)
    setModalConfirmIsOpen(false)
    setContactPosition(null);
  }

  return (
    <>
      <Head>
        <title>Contato Seguro - Canal de Ética</title>
      </Head>
      <Main>
        <Container>
          <Image src={logo} alt='' />
          <Fields>
            <button onClick={handleInsertNewContact}>
              <Plus color="#FFF" size={26} weight="bold" />
            </button>

            <Modal
              isOpen={modalContactIsOpen}
              onRequestClose={() => setModalContactIsOpen(false)}
              style={modalStyle}
              ariaHideApp={false}
            >
              <ModalHeader>
                <h2>Inserir</h2>
                <button onClick={() => setModalContactIsOpen(false)}>
                  <X color="#EEE" size={30} weight="bold" />
                </button>
              </ModalHeader>
              <ModalForm>
                <label htmlFor="name">
                  <span>Nome:</span>
                  <input
                    id="name"
                    type="text"
                    min={3}
                    name="name"
                    value={contactObject.name}
                    onChange={handleEditContact}
                  />
                </label>
                <label htmlFor="email">
                  <span>E-mail:</span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={contactObject.email}
                    onChange={handleEditContact}
                  />
                </label>
                <PhoneAndBirthday>
                  <label htmlFor="phone">
                    <span>Telefone:</span>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={contactObject.phone}
                      onChange={handleEditContact}
                    />
                  </label>
                  <label htmlFor="birthday">
                    <span>Data de Nascimento:</span>
                    <input
                      id="birthday"
                      type="text"
                      name="birthday"
                      value={contactObject.birthday}
                      onChange={handleEditContact}
                    />
                  </label>
                </PhoneAndBirthday>
                <label htmlFor="city">
                  <span>Cidade onde nasceu:</span>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={contactObject.city}
                    onChange={handleEditContact}
                  />
                </label>
                <ModalFormButtons>
                  <button onClick={handleClearFields}>Limpar</button>
                  <button onClick={handleSendConfirm}>Confirmar</button>
                </ModalFormButtons>
              </ModalForm>
            </Modal>
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
              <option value="birthday">Nascimento</option>
              <option value="city">Cidade</option>
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
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {filteredObj.map((obj, i) => (
                <tr key={i}>
                  <td>{obj.name}</td>
                  <td>{obj.email}</td>
                  <td>{obj.phone}</td>
                  <td>{obj.birthday}</td>
                  <td>{obj.city}</td>
                  <td>
                    <button onClick={() => handleEditButton(obj, i)}>
                      <PencilSimpleLine size={26} color="#FFF" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleRemoveContact(i)}>
                      <Trash size={26} color="#FFF" />
                    </button>
                  </td>
                </tr>
              ))}
              <Modal
                isOpen={modalConfirmIsOpen}
                onRequestClose={() => setModalConfirmIsOpen(false)}
                style={modalStyle}
              >
                <ModalConfirmContainer>
                  <h2>Você deseja mesmo excluir este contato?</h2>
                  <ModalConfirmButtons>
                    <button onClick={handleConfirmDelete}>Sim</button>
                    <button onClick={() => setModalConfirmIsOpen(false)}>Não</button>
                  </ModalConfirmButtons>
                </ModalConfirmContainer>
              </Modal>
            </tbody>
          </Table>
        </Container>
      </Main >
    </>
  )
}
