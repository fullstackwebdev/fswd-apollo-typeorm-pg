import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';
import { getPhotos, createPhoto, getPhotoViaUser } from './photo.tests.api';
import { getMe, signIn, createAccount } from '../User/tests.api';
import { inspect } from 'util';

let token;

chai.use(chaiSubset);

describe('photos', () => {
  beforeAll(async () => {
    chai.use(chaiSubset);
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
    expect(data.data.photos[0]).to.have.keys(['name', 'user']);
    expect(data.data.photos[0].user).to.exist;
    expect(data.data.photos[0].user).to.containSubset({
      username: 'photoUser',
    });
  });
  it('get all nested photos via user', async () => {
    const {
      data: {
        data: {
          me: { id },
        },
      },
    } = await getMe(token);
    expect(id).to.exist;
    const variables = {
      id,
    };
    const { data } = await getPhotoViaUser({ variables, token });
    expect(data.data.user.photos).to.exist;
    // expect(data.data.user.photos[0]).to.have.keys(['id', 'name']);
    expect(data.data.user.photos[0]).to.containSubset({
      name: 'new photo',
    });
  });
});
