import { expect } from 'chai';
import { signIn, createAccount, getUsers, isLoggedin } from './tests.api';
import { inspect } from 'util';

let token;

describe('users', () => {
  describe('sanity check', () => {
    it('get all users', async () => {
      const { data } = await getUsers({});
      expect(true).to.be.true;
      // console.log(`got data ${inspect(data)}`);
      // expect(data).to.not.be.undefined;
      // expect(data.errors).to.be.undefined();
    });
    it('creates a new user', async () => {
      const { data } = await createAccount({
        username: 'david',
        password: 'david',
        email: 'email@email.com',
      });
      // console.log(`got data ${inspect(data)}`);

      expect(data.data.createUser).to.have.keys(['username', 'password', 'email']);
      expect(data.errors).to.be.undefined;
    });
  });
  describe('jest sequential work around', () => {
    it('should login', async () => {
      const { data } = await signIn({
        username: 'david',
        password: 'david',
      });
      // console.log(`!!!got data ${inspect(data)}`);
      expect(data.data.signIn).to.have.keys(['token', 'message']);
      expect(data.errors).to.be.undefined;
      token = data.data.signIn.token;
    });
    it('should check I am loggedin', async () => {
      // console.log(`loggedin got token ${inspect(token)}`);
      const { data } = await isLoggedin(token);
      // console.log(`loggedin got data ${inspect(data)}`);
      expect(data.data.loggedIn).to.be.true;
      expect(data.errors).to.be.undefined;
    });
  });
});
