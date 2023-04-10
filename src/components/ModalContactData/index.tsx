import { X } from '@phosphor-icons/react';
import Modal from 'react-modal';
import data from '@/data/data.json';
import moment from 'moment';
import { initialStateObj, useMyContext } from '@/contexts/context';
import {
  ModalForm,
  ModalFormButtons,
  ModalHeader,
  PhoneAndBirthday,
  modalStyle
} from './styles';

export function ModalContactData() {
  const {
    inputValue, selectedOption,
    modalContactIsOpen, setModalContactIsOpen,
    contactObject, setContactObject,
    contactPosition, setContactPosition
  } = useMyContext()

  const filteredObj = inputValue.length > 0 ?
    data.filter(item => (
      item[selectedOption as keyof typeof initialStateObj].toLowerCase()
        .includes(inputValue.toLowerCase()))
    ) : data

  function handleEditContact(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { id, value } = e.target;
    setContactObject(prevState => ({ ...prevState, [id]: value }))
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

  return (
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
            value={contactObject.name}
            onChange={handleEditContact}
            placeholder="Nome completo"
            required
          />
        </label>
        <label htmlFor="email">
          <span>E-mail:</span>
          <input
            id="email"
            type="email"
            value={contactObject.email}
            onChange={handleEditContact}
            placeholder="email@email.com"
            required
          />
        </label>
        <PhoneAndBirthday>
          <label htmlFor="phone">
            <span>Telefone:</span>
            <input
              id="phone"
              type="tel"
              value={contactObject.phone}
              onChange={handleEditContact}
              placeholder="(12) 93456-7890"
              required
            />
          </label>
          <label htmlFor="birth_date">
            <span>Data de Nascimento:</span>
            <input
              id="birth_date"
              type="date"
              value={moment(contactObject.birth_date).format('YYYY-MM-DD')}
              onChange={handleEditContact}
              placeholder="01/01/1990"
              required
            />
          </label>
        </PhoneAndBirthday>
        <label htmlFor="city">
          <span>Cidade onde nasceu:</span>
          <input
            id="city"
            type="text"
            value={contactObject.city}
            onChange={handleEditContact}
            placeholder="Porto Alegre"
            required
          />
        </label>
        <ModalFormButtons>
          <button onClick={handleClearFields}>Limpar</button>
          <button onClick={handleSendConfirm} type="submit">Confirmar</button>
        </ModalFormButtons>
      </ModalForm>
    </Modal>
  )
}