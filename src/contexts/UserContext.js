import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

// Crear un contexto para el usuario
export const UserContext = createContext();

/**
 * Proveedor de contexto para el usuario.
 * Provee el estado del usuario y una función para actualizarlo a los componentes hijos.
 * 
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que serán envueltos por el proveedor.
 */
export const UserProvider = ({ children }) => {
    // Estado para almacenar los datos del usuario
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtener el token de acceso almacenado en el localStorage
        const token = localStorage.getItem('access_token');
        if (token) {
            // Hacer una solicitud para obtener los datos del usuario
            axios.get('/user/', {
                headers: {
                    Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
                }
            })
            .then(response => {
                // Si la solicitud es exitosa, actualizar el estado del usuario
                setUser(response.data);
            })
            .catch(error => {
                // Si hay un error en la solicitud, registrar el error y establecer el usuario como null
                console.log("Error fetching user data:", error);
                setUser(null);
            });
        }
    }, []); // El efecto se ejecuta una vez al montar el componente

    const login = (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        axios.get('/user/')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log("Error fetching user data:", error);
            });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers['Authorization'];
        setUser(null);
    };

    return (
        // Proveer el estado del usuario y la función para actualizarlo a los componentes hijos
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
