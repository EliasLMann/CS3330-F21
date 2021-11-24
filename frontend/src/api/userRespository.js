import axios from 'axios';

export class UserRepository {
    /**
   * Create new account
   * @param {string} email - The email to sign in with
   * @param {string} userName - the username used to sign in
   * @param {string} password - The password to sign in with
   * @param {string} accountType - restaurant vs customer
   * @returns {Object} - the errors of the login request
   */
    async registerCustomer(email, userName, password, accountType) {
        const errors = { success: false };

        const { data, status } = await axios.post(URL + '/api/createUser', {
            email,
            userName,
            password,
            accountType
          });

          if (data.status && data.status === 1) errors.email = 'Email already used';

          if (status <= 201) {
            errors.success = true;
            sessionStorage.setItem(
              'user',
              JSON.stringify({
                username: email,
                role: 'employee',
                userId: data.data.insertId,
                officeId: officeId,
                password: password,
                status: 0
              })
            );
          }
      
          return errors;
    }

}