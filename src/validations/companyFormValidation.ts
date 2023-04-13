import { CompanyModel } from "@/interfaces";
import { FormHandles } from "@unform/core";
import { RefObject } from "react";

export function companyFormValidation(data: CompanyModel, formRef: RefObject<FormHandles>) {
  const { name, cnpj, address, users } = data;

  if (!name || !name.trim()) {
    formRef.current?.setFieldError('name', 'Nome obrigatório.')
    return;
  }

  if (name.length < 3) {
    formRef.current?.setFieldError('name', 'Nome deve ter no mínimo 3 caracteres.')
    return;
  }

  if (!cnpj || !cnpj.trim()) {
    formRef.current?.setFieldError('cnpj', 'CNPJ obrigatório.')
    return;
  }

  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  if (!cnpj.match(cnpjRegex)) {
    formRef.current?.setFieldError('cnpj', 'CNPJ inválido.');
    return;
  }

  if (!address || !address.trim()) {
    formRef.current?.setFieldError('address', 'Endereço obrigatório.');
    return;
  }

  if (!users || !users.length) {
    formRef.current?.setFieldError('users', 'Usuário(s) obrigatório(s).');
    return;
  }

  return null;
}
