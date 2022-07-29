import { useRef, useState, createContext } from "react";

export const DialogContext = createContext({});

export default function DialogProvider({ children }) {
    const [dialog, setDialog] = useState(null);
    return (
        <DialogContext.Provider value={useRef({ openDialog: dialog => setDialog(dialog), closeDialog: () => setDialog(null) }).current}>
            {children}
            {dialog}
        </DialogContext.Provider>
    );
}