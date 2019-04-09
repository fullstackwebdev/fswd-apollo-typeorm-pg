/* eslint-disable @typescript-eslint/camelcase */
import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';
import { getJob, getJobs, createJob } from './job.tests.api';
import { inspect } from 'util';

let token;
const newJob = {
  id: '~019f91449f061c34bb',
  title: 'Fixing an existent PHP / MySQL Software',
  snippet:
    "I have a hand coded application which was recently completed and it worked in the past properly.\nAfter many problems with my old server provider I was forced to change the server provider.\nI have now my own server and after I have installed the software, it doesn't work properly and I'm not able to find out why. Some country settings doesn't work anymore. \n\nTo this domain is attached a main MySQL DB for data and another language MySQL DB for the text of the user interface. \n\nThis one domain is responsible for the registration process of companies and for the administrations of the company data. Actual are 20 countries in 16 languages available. The countries can have one or more languages. This language and country combination are stored in the session like “de_DE” for Germany and “fr_FR” for France or “fr_CH” for french user interface for Switzerland.\n\nIf I change to an country (e.g. to Italy), the User interface must change to Italian and that is not the case. For 5 countries it works OK.\n\nThe programmer that made the application is no longer able to provide support.\n\nWith your help I just want to find out why the application doesn't work properly and to fix the problem.\n\nPlease apply for this job only if you are fit in PHP and you can show in the output some PHP variables or MySQL querry's.",
  category2: 'Web, Mobile & Software Dev',
  subcategory2: 'Web Development',
  skills: ['css', 'database-management', 'javascript', 'mysql', 'mysql-programming', 'php', 'website-development'],
  job_type: 'Fixed',
  budget: 80,
  duration: null,
  workload: null,
  job_status: 'Open',
  date_created: '2019-03-25T19:38:40+0000',
  url: 'http://www.upwork.com/jobs/~019f91449f061c34bb',
  client: {
    country: 'Germany',
    feedback: 4.8208333333,
    reviews_count: 2,
    jobs_posted: 2,
    past_hires: 2,
    payment_verification_status: 'VERIFIED',
  },
};

describe('jobs', () => {
  beforeAll(async () => {
    chai.use(chaiSubset);
  });

  it('creates a job', async () => {
    const { data } = await createJob({ variables: newJob });
    // expect(data.data.createJob).to.have.keys(['title', 'snippet']);
    expect(data.data.createJob).to.containSubset(newJob);
    expect(data.errors).to.be.undefined;
  });
  it('get all jobs', async () => {
    const { data } = await getJobs({ variables: newJob });
    expect(data.data.jobs[0]).to.containSubset(newJob);
    expect(data.errors).to.be.undefined;
  });
  it('get specific job id ', async () => {
    const { data } = await getJob({ variables: { id: newJob.id } });
    // console.log(`!!!!got data ${inspect(data.data.job, false, 9)}`);
    // console.log(`!!!!got variables ${inspect(newJob, false, 9)}`);
    expect(data.data.job).to.containSubset(newJob);
    expect(data.errors).to.be.undefined;
  });
});
