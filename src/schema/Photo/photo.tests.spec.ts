import chai, { expect } from 'chai';
// import chai from 'chai';
import chaiSubset from 'chai-subset';
import { getPhotos, createPhoto } from './photo.tests.api';
import { signIn, createAccount } from '../User/tests.api';
import { inspect } from 'util';

let token;

describe('photos', () => {
  beforeAll(async () => {
    chai.use(chaiSubset);
    // it('creates a new user', async () => {
    await createAccount({
      username: 'photoUser',
      password: 'photoUser',
      email: 'photoUser@email.com',
    });
    const { data } = await signIn({ username: 'photoUser', password: 'photoUser' });
    token = data.data.signIn.token;
  });

  it('creates a photo', async () => {
    const variables = {
      photo: {
        name: 'new photo',
      },
    };
    const { data } = await createPhoto({ variables, token });
    // console.log(`creates a photo inspect ${inspect(data, true, 3)}`);
    expect(data.data.createPhoto).to.have.keys(['name', 'user']);
    expect(data.data.createPhoto.user).to.exist;
    expect(data.data.createPhoto.user).to.have.keys(['username']);
    expect(data.data.createPhoto.user).to.containSubset({
      username: 'photoUser',
    });

    expect(data.errors).to.be.undefined;
  });
  it('get all photos', async () => {
    const variables = {};
    const { data } = await getPhotos({ variables, token });
    // console.log(`inspect ${inspect(data, false, 6)}`);
    expect(data.data.photos[0]).to.have.keys(['name', 'user']);
    expect(data.data.photos[0].user).to.exist;
    // expect(data.data.photos[0].user).to.have.keys(['username']);
    expect(data.data.photos[0].user).to.containSubset({
      username: 'photoUser',
    });

    // expect(data).to.be.true;
  });
});
