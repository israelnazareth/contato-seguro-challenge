import { CompanyRow, MyContextData, UserRow } from "@/interfaces";
import { getUsers } from "@/services";
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

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
  users: '',
}

const MyContext = createContext<MyContextData>({} as MyContextData);

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext deve ser utilizado dentro de um Provider.");
  }
  return context;
}

export function MyContextProvider({ children }: { children: React.ReactNode }) {
  const [inputValue, setInputValue] = useState('');
  const [modalContactIsOpen, setModalContactIsOpen] = useState(false);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('name');

  const [contactObject, setContactObject] = useState(initialStateObj);
  const [contactID, setContactID] = useState<number>(0);
  const [users, setUsers] = useState<UserRow[]>([]);

  const [companyObject, setCompanyObject] = useState(initialStateObjCompany);
  const [companyID, setCompanyID] = useState<number>(0);
  const [companies, setCompanies] = useState<CompanyRow[]>([]);

  function fetchUsers() {
    setTimeout(async () => {
      const response = await getUsers();
      setUsers(response);
    }, 10)
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const values = {
    inputValue, setInputValue,
    modalContactIsOpen, setModalContactIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setSelectedOption,
    contactObject, setContactObject,
    contactID, setContactID,
    users, setUsers, fetchUsers,
    companyObject, setCompanyObject,
    companyID, setCompanyID,
    companies, setCompanies
  }

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
}