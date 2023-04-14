import { createContext, useContext, useEffect, useState } from "react";
import { CompanyRow, MyContextData, UserRow } from "@/interfaces";
import { getCompanies } from "@/services/companies";
import { getUsers } from "@/services/users";
import { getUsersCompanies } from "@/services/users-companies";

const MyContext = createContext<MyContextData>({} as MyContextData);

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext deve ser utilizado dentro de um Provider.");
  }
  return context;
}

export const initialStateObj = {
  id: 0,
  name: '',
  email: '',
  birth_date: '',
  city: '',
  phone: ''
}

export const initialStateObjCompany = {
  id: 0,
  name: '',
  cnpj: '',
  address: '',
  users: [0],
}

export const initialStateObjUsersCompanies = {
  user_id: 0,
  company_id: 0,
}

export function MyContextProvider({ children }: { children: React.ReactNode }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('name');

  const [contactObject, setContactObject] = useState(initialStateObj);
  const [contactID, setContactID] = useState<number>(0);
  const [users, setUsers] = useState<UserRow[]>([]);

  const [companyObject, setCompanyObject] = useState(initialStateObjCompany);
  const [companyID, setCompanyID] = useState<number>(0);
  const [companies, setCompanies] = useState<CompanyRow[]>([]);

  const [usersCompanies, setUsersCompanies] = useState([initialStateObjUsersCompanies]);

  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function fetchUsers() {
    setTimeout(async () => {
      const response = await getUsers();
      setUsers(response);
    }, 10)
  }

  function fetchCompanies() {
    setTimeout(async () => {
      const response = await getCompanies();
      setCompanies(response);
    }, 100)
  }

  function fetchUsersAndCompanies() {
    setTimeout(async () => {
      const response = await getUsersCompanies();
      setUsersCompanies(response);
    }, 100)
  }

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
    fetchUsersAndCompanies();
  }, [])

  const values = {
    inputValue, setInputValue,
    modalIsOpen, setModalIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setSelectedOption,
    contactObject, setContactObject,
    contactID, setContactID,
    users, setUsers,
    companyObject, setCompanyObject,
    companyID, setCompanyID,
    companies, setCompanies,
    usersCompanies, setUsersCompanies,
    fetchUsers, fetchCompanies, fetchUsersAndCompanies
  }

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
}
