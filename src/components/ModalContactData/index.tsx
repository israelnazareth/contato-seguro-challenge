import { X } from '@phosphor-icons/react';
import Modal from 'react-modal';
import { initialStateObj, useMyContext } from '@/contexts/context';
import {
  ModalForm,
  ModalFormButtons,
  ModalHeader,
  PhoneAndBirthday,
  modalStyle
} from './styles';
import { createUser, updateUser } from '@/services';
import Input from '../Input';
import { useRef } from 'react';
import { UserModel } from '@/interfaces';
import { FormHandles } from '@unform/core';

export function ModalContactData() {
  const formRef = useRef<FormHandles>(null);

  const {
    modalContactIsOpen, setModalContactIsOpen,
    contactObject, setContactObject,
    fetchUsers
  } = useMyContext()

  function handleClearFields() {
    setContactObject(initialStateObj)
    formRef.current!.reset()
  }

  function handleSubmit(data: UserModel) {
    const { name, email } = data;
    const { id } = contactObject

    if (!name || !name.trim()) {
      formRef.current?.setFieldError('name', 'Nome obrigatório.')
      return;
    }

    if (name.length < 3) {
      formRef.current?.setFieldError('name', 'Nome deve ter no mínimo 3 caracteres.')
      return;
    }

    if (!email || !email.trim()) {
      formRef.current?.setFieldError('email', 'Email obrigatório.')
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      formRef.current?.setFieldError('email', 'Email inválido.');
      return;
    }

    if (id > 0) {
      updateUser(id, data)
      setModalContactIsOpen(false);
    } else if (id === 0) {
      createUser(data)
      setModalContactIsOpen(false);
    }

    fetchUsers()
  }

  return (
    <Modal
      isOpen={modalContactIsOpen}
      onRequestClose={() => setModalContactIsOpen(false)}
      style={modalStyle}
      ariaHideApp={false}
    >
      <ModalHeader>
        {contactObject.id > 0 ? <h2>Editar</h2> : <h2>Inserir</h2>}
        <button onClick={() => setModalContactIsOpen(false)}>
          <X color="#EEE" size={30} weight="bold" />
        </button>
      </ModalHeader>
      <ModalForm onSubmit={handleSubmit} ref={formRef}>
        <Input
          name="name"
          label='Nome:'
          placeholder='Nome completo'
          defaultValue={contactObject.name}
        />
        <Input
          name="email"
          label='Email:'
          placeholder='email@email.com'
          defaultValue={contactObject.email}
        />
        <PhoneAndBirthday>
          <Input
            type='tel'
            mask="(99) 99999-9999"
            name="phone"
            label='Telefone:'
            placeholder='(12) 93456-7890'
            defaultValue={contactObject.phone}
          />
          <Input
            name="birth_date"
            type='date'
            label='Data de nascimento:'
            placeholder="01/01/1990"
            defaultValue={contactObject.birth_date}
          />
        </PhoneAndBirthday>
        <Input
          name="city"
          label='Cidade onde nasceu:'
          placeholder="Porto Alegre"
          defaultValue={contactObject.city}
        />
        <ModalFormButtons>
          <button type="submit">Confirmar</button>
          <button onClick={handleClearFields}>Limpar</button>
        </ModalFormButtons>
      </ModalForm>
    </Modal>
  )
}