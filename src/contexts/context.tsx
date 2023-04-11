import { UserModel, UserRow } from "@/interfaces";
import { getUsers } from "@/services";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface MyContextData {
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  modalContactIsOpen: boolean
  setModalContactIsOpen: Dispatch<SetStateAction<boolean>>
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
};

export const initialStateObj = {
  id: 0,
  name: '',
  email: '',
  birth_date: '',
  city: '',
  phone: ''
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
    users, setUsers, fetchUsers
  }

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
}
