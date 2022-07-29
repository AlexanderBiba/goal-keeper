export function loadStateFromLocalStorage() {
    try {
        const state = localStorage.getItem("state");
        if (!state) return;
        return JSON.parse(state);
    } catch (err) {
        console.error("Could not get state from localStorage", err);
    }
};

export function saveStateToLocalStorage(state) {
    try {
        localStorage.setItem("state", JSON.stringify(state));
    } catch {
        console.error("Could not set state to localStorage", err);
    }
};