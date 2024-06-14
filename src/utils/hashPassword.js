import bycript from 'bcrypt';

// Funcion para encriptar la pass

  export const createHash = ( password ) => {
    return bycript.hashSync(password, bycript.genSaltSync(10));
  };

// Funcion para validar la Pass

  export const isValidPassword = (user, password) => {
    return bycript.compareSync(password, user.password)
  };