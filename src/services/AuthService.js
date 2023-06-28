import http from "../utils/HttpClient";

const ping = async () => {
  const response = await http.get('/');
  console.log(response.data);
  return response.data;
}

const login = (data) => {
  return http.post('/login', data, {
      transformResponse: [(result) => {
          const parsed = JSON.parse(result);

          localStorage.setItem('authUser', JSON.stringify(parsed));
          return parsed;
      }]
  });
}

const register = (data) => {
  return http.post('/register', data);
}

const profile = () => {
  return http.get('/user');
}

const logout = () => {
  return http.get('/logout', null, {
      transformResponse: [(result) => {
          localStorage.removeItem('authUser');
          return JSON.parse(result);
      }]
  });
}

const getAuthCredentials = () => {
  return JSON.parse(localStorage.getItem('authUser'));
}  

const getAuthUser = () => {
  return JSON.parse(localStorage.getItem('authUser'));
}  


const methods = { 
  ping,
  login,
  register,
  profile,
  logout,
  getAuthCredentials,
  getAuthUser
}

export default methods;