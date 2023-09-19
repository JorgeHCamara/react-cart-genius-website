import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validação de tipo para children
};

export const useAuth = () => {
    return useContext(AuthContext);
};
