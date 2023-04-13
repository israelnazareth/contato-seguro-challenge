import { UserModel } from "@/interfaces";
import { FormHandles } from "@unform/core";
import { RefObject } from "react";

export function userFormValidation(data: UserModel, formRef: RefObject<FormHandles>) {
  const { name, email } = data;

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

  return null
}
