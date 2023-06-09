import { Dispatch, SetStateAction } from "react"

export interface UserModel {
  name: string,
  email: string,
  phone: string,
  birth_date: string,
  city: string
}

export interface UserRow extends UserModel {
  id: number
}

export interface CompanyModel {
  name: string,
  cnpj: string,
  address: string,
  users: number[],
}

export interface CompanyRow extends CompanyModel {
  id: number
}

export interface UserCompanyModel {
  user_id: number,
  company_id: number
}

export interface MyContextData {
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  modalConfirmIsOpen: boolean
  setModalConfirmIsOpen: Dispatch<SetStateAction<boolean>>
  selectedOption: string,
  setSelectedOption: Dispatch<SetStateAction<string>>
  contactObject: UserRow
  setContactObject: Dispatch<SetStateAction<UserRow>>
  contactID: number
  setContactID: Dispatch<SetStateAction<number>>
  users: UserRow[]
  setUsers: Dispatch<SetStateAction<UserRow[]>>
  fetchUsers: () => void
  fetchCompanies: () => void
  fetchUsersAndCompanies: () => void
  companyObject: CompanyRow
  setCompanyObject: Dispatch<SetStateAction<CompanyRow>>
  companyID: number
  setCompanyID: Dispatch<SetStateAction<number>>
  companies: CompanyRow[]
  setCompanies: Dispatch<SetStateAction<CompanyRow[]>>
  usersCompanies: UserCompanyModel[]
  setUsersCompanies: Dispatch<SetStateAction<UserCompanyModel[]>>
};
