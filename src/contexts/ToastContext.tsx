import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ToastMessage from "../components/ToastMessage";

interface ToastContextType {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

interface ToastContextProviderProps {
  children: ReactNode;
}

export const ToastContextProvider = ({
  children,
}: ToastContextProviderProps) => {
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (message) {
      if(timerId) {
        window.clearTimeout(timerId);
        setTimerId(undefined);
      }

      setTimerId(
        window.setTimeout(() => {
          setMessage("");
        }, 3000),
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <ToastContext.Provider value={{ message, setMessage }}>
      <ToastMessage message={message} />
      {children}
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useToastContext() {
  const ctx = useContext(ToastContext);
  return ctx;
}
