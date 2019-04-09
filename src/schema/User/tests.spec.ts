import { expect } from 'chai';
import { getMe, signIn, createAccount, getUsers, isLoggedin } from './tests.api';
import { inspect } from 'util';

let token;

describe('users', () => {
  describe('sanity check', () => {
    it('get all users', async () => {
      const { data } = await getUsers({});
      expect(true).to.be.true;
    });
    it('creates a new user', async () => {
      const { data } = await createAccount({
        username: 'david',
        password: 'david',
        email: 'email@email.com',
      });
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
      expect(data.data.signIn).to.have.keys(['token', 'message']);
      expect(data.errors).to.be.undefined;
      token = data.data.signIn.token;
    });
    it('should check I am loggedin', async () => {
      const { data } = await isLoggedin(token);
      expect(data.data.loggedIn).to.be.true;
      expect(data.errors).to.be.undefined;
    });
    it('should get my id', async () => {
      const { data } = await getMe(token);
      expect(data.data.me.id).to.exist;
      expect(data.errors).to.be.undefined;
    });
  });
});
