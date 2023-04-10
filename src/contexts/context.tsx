import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
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
  contactObject: typeof initialStateObj
  setContactObject: Dispatch<SetStateAction<typeof initialStateObj>>
  contactPosition: number | null
  setContactPosition: Dispatch<SetStateAction<number | null>>
};

export const initialStateObj = {
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
  const [contactPosition, setContactPosition] = useState<number | null>(null);

  const values = {
    inputValue, setInputValue,
    modalContactIsOpen, setModalContactIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setSelectedOption,
    contactObject, setContactObject,
    contactPosition, setContactPosition
  }

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
}
