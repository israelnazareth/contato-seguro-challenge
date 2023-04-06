import Image from "next/image"
import logo from '../../assets/logo.png';
import data from '../../data/data.json';
import { PencilSimpleLine, Plus, Trash, X } from "@phosphor-icons/react";
import { Container, Fields, ModalHeader, Main, Table, customModal, ModalForm, ModalFormButtons, PhoneAndBirthday } from "./styles"
import { useState } from "react";
import Modal from 'react-modal';

interface ObjData {
  name: string,
  email: string,
  phone: string,
  birthday: string,
  city: string
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('name');
  const [modalIsOpen, setIsOpen] = useState(false);

  const filteredObj = inputValue.length > 0 ?
    data.filter(item => (
      item[selectedOption as keyof ObjData].toLowerCase()
        .includes(inputValue.toLowerCase()))
    ) : data

  return (
    <>
      <Main>
        <Container>
          <Image src={logo} alt='' />
          <Fields>
            <button onClick={() => setIsOpen(true)}>
              <Plus color="#FFF" size={26} weight="bold" />
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
              style={customModal}
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
                  <input id="name" type="text" min={3} />
                </label>
                <label htmlFor="email">
                  <span>E-mail:</span>
                  <input id="email" type="email" />
                </label>
                <PhoneAndBirthday>
                  <label htmlFor="phone">
                    <span>Telefone:</span>
                    <input id="phone" type="tel" />
                  </label>
                  <label htmlFor="birthday">
                    <span>Data de Nascimento:</span>
                    <input id="birthday" type="date" />
                  </label>
                </PhoneAndBirthday>
                <label htmlFor="city">
                  <span>Cidade onde nasceu:</span>
                  <input id="city" type="text" />
                </label>
                <ModalFormButtons>
                  <button onClick={(e) => e.preventDefault()}>Limpar</button>
                  <button onClick={(e) => e.preventDefault()}>Enviar</button>
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
              {filteredObj.map(value => (
                <>
                  <tr>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    <td>{value.birthday}</td>
                    <td>{value.city}</td>
                    <td>
                      <button>
                        <PencilSimpleLine size={32} color="#FFF" />
                      </button>
                    </td>
                    <td>
                      <button>
                        <Trash size={32} color="#FFF" />
                      </button>
                    </td>
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
