import api from "./api";


export const saveToken = (access,refresh) => {
    //console.log("access saved =>",access)
    //console.log("refresh saved =>",refresh)
    localStorage.setItem("access",access)
    localStorage.setItem("refresh",refresh)
}


export const login = (username, password) => {
    return api.post('token/',{username, password});
}

export const logout = () =>{
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}

export const isLogged = () => {
    let token = localStorage.getItem('access')
    console.log(token)
    return !!token;
}

export const getToken = () => {
    return localStorage.getItem('access');
}

export const signup = async (userData) => {
  const response = await api.post('signup/', userData);
  return response.data;
};
