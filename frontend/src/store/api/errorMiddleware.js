// errorMiddleware.js

import { userApi } from './userApi'; // Импортируйте ваш API

const errorMiddleware = ({ dispatch }) => (next) => (action) => {
    if (action.error && action.error.status === 401) {
        console.log('401 (Unauthorized)')
        // Обработка ошибки 401 (Unauthorized)
        // Здесь вы можете выполнить переадресацию на страницу /login
        // Например, с помощью библиотеки react-router-dom или другой библиотеки маршрутизации
        // Пример с react-router-dom:
        // history.push('/login');
    }
    return next(action);
};

export default errorMiddleware;
