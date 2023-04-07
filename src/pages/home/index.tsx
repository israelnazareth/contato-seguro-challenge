import Image from "next/image"
import logo from '../../assets/logo.png';
import data from '../../data/data.json';
import { PencilSimpleLine, Plus, Trash, X } from "@phosphor-icons/react";
import { Container, Fields, ModalHeader, Main, Table, customModal, ModalForm, ModalFormButtons, PhoneAndBirthday } from "./styles"
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('name');
  const [contactObject, setContactObject] = useState(initialStateObj);
  const [contactPosition, setContactPosition] = useState(0);

  const filteredObj = inputValue.length > 0 ?
    data.filter(item => (
      item[selectedOption as keyof ObjDataTypes].toLowerCase()
        .includes(inputValue.toLowerCase()))
    ) : data

  function handleInsertNewContact() {
    setIsOpen(true);
    setContactObject(initialStateObj)
  }

  function handleEditButton(obj: ObjDataTypes, index: number) {
    setIsOpen(true);
    setContactObject(obj);
    setContactPosition(index);
  }

  function handleEditInput(e: any) {
    const { name, value } = e.target;
    setContactObject({ ...contactObject, [name]: value })
  }

  function handleClearFields(e: any) {
    e.preventDefault();
    setContactObject(initialStateObj)
  }

  function handleSendConfirm(e: any) {
    e.preventDefault();
    filteredObj[contactPosition] = contactObject;
    setIsOpen(false);
  }

  function handleRemoveContact(index: number) {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      filteredObj.splice(index, 1);
    }
  }

  return (
    <>
      <Main>
        <Container>
          <Image src={logo} alt='' />
          <Fields>
            <button onClick={handleInsertNewContact}>
              <Plus color="#FFF" size={26} weight="bold" />
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
              style={customModal}
              ariaHideApp={false}
            >
              <ModalHeader>
                <h2>Inserir</h2>
                <button onClick={() => setIsOpen(false)}>
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
                    onChange={handleEditInput}
                  />
                </label>
                <label htmlFor="email">
                  <span>E-mail:</span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={contactObject.email}
                    onChange={handleEditInput}
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
                      onChange={handleEditInput}
                    />
                  </label>
                  <label htmlFor="birthday">
                    <span>Data de Nascimento:</span>
                    <input
                      id="birthday"
                      type="text"
                      name="birthday"
                      value={contactObject.birthday}
                      onChange={handleEditInput}
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
                    onChange={handleEditInput}
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
                      <PencilSimpleLine size={32} color="#FFF" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleRemoveContact(i)}>
                      <Trash size={32} color="#FFF" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Main >
    </>
  )
}
