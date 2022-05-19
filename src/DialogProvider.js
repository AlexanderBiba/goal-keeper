import { useRef, useContext, createContext, useState } from "react";
import { Dialog } from "@mui/material";

const DialogContext = createContext([() => { }, () => { }]);
export const useDialog = () => useContext(DialogContext);

export default function DialogProvider({ children }) {
    const [dialogs, setDialogs] = useState([]);
    const closeDialog = () => {
        setDialogs((dialogs) => {
            const latestDialog = dialogs.pop();
            if (!latestDialog) return dialogs;
            if (latestDialog.onClose) latestDialog.onClose();
            return [...dialogs].concat({ ...latestDialog, open: false });
        });
    };
    const contextValue = useRef([
        option => {
            const dialog = { ...option, open: true };
            setDialogs((dialogs) => [...dialogs, dialog]);
        },
        closeDialog
    ]);

    return (
        <DialogContext.Provider value={contextValue.current}>
            {children}
            {dialogs.map((dialog, i) => {
                const { onClose, ...dialogParams } = dialog;
                return (
                    <Dialog
                        key={i}
                        onClose={closeDialog}
                        {...dialogParams}
                    />
                );
            })}
        </DialogContext.Provider>
    );
}
