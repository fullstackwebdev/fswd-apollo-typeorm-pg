import axios from 'axios';
import { inspect } from 'util';

import { PORT, SERVER } from '../../env';
const API_URL = `http://${SERVER}:${PORT}/graphql`;

const setToken = token => {
  return token ? { headers: { 'x-token': token } } : null;
};

const getJobs = async ({ variables }) =>
  axios.post(
    API_URL,
    {
      query: `
      fragment clientFields on Client {
        country
        feedback
        reviews_count
        jobs_posted
        past_hires
        payment_verification_status
      }
      fragment jobFields on Job {
        id
        title
        snippet
        category2
        subcategory2
        skills
        job_type
        budget
        duration
        workload
        job_status
        date_created
        url
        client {
          ...clientFields
        }
      }

      query getJobs {
        jobs {
          ...jobFields 
        }
      }  
      `,
      variables,
    },
    // setToken(token),
  );

const getJob = async ({ variables }) =>
  axios.post(
    API_URL,
    {
      query: `
      fragment clientFields on Client {
        country
        feedback
        reviews_count
        jobs_posted
        past_hires
        payment_verification_status
      }
      fragment jobFields on Job {
        id
        title
        snippet
        category2
        subcategory2
        skills
        job_type
        budget
        duration
        workload
        job_status
        date_created
        url
        client {
          ...clientFields
        }
      }

      query getJob($id: String!) {
        job(id: $id ) {
          ...jobFields
        }
      }  
      `,
      variables,
    },
    // setToken(token),
  );

const createJob = async ({ variables }) => {
  // console.log(`got variables ${inspect(variables)}`);
  return axios.post(
    API_URL,
    {
      query: `
      fragment clientFields on Client {
        country
        feedback
        reviews_count
        jobs_posted
        past_hires
        payment_verification_status
      }
      fragment jobFields on Job {
        id
        title
        snippet
        category2
        subcategory2
        skills
        job_type
        budget
        duration
        workload
        job_status
        date_created
        url
        client {
          ...clientFields
        }
      }

      mutation createJob 
      (
          $id: String
          $title: String
          $snippet : String
          $category2 : String
          $subcategory2 : String
          $skills : [String]
          $job_type : String
          $budget : Int
          $duration : String
          $workload: String
          $job_status : String
          $date_created : String
          $url : String
          $client : ClientInput
      ) {
        createJob(
          job:
          {
          id: $id
          title: $title
          snippet: $snippet
          category2: $category2
          subcategory2: $subcategory2
          skills: $skills
          job_type: $job_type
          budget: $budget
          duration: $duration
          workload: $workload
          job_status: $job_status
          date_created: $date_created
          url: $url
          client: $client 
          }
        ) {
           ...jobFields
        }
      }  
      `,
      variables,
    },
    // setToken(token),
  );
};

export { getJob, getJobs, createJob };
