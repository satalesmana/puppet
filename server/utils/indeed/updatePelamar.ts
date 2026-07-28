import type { IndeedFetchPelamanrReq, RootIndeedPelamar, DataIndeedPelamar } from '~/server/types/indeedPelamarReqResponse.interface'

export const indeedUpdatePelamar = async ({
  cookies,
  candidateSubmissionEmployerJobIdPairs,
}:any)=>{
  const requestBody= {
    "operationName": "UpdateCandidateSubmissionMilestone",
    "variables": {
      "input": {
        "move": {
          "milestoneId": "REJECTED",
          "candidateSubmissionEmployerJobIdPairs": candidateSubmissionEmployerJobIdPairs
        }
      }
    },
    "extensions": {},
    "query": "mutation UpdateCandidateSubmissionMilestone($input: UpdateCandidateSubmissionMilestoneInput!) {\n  updateCandidateSubmissionMilestone(input: $input) {\n    candidateSubmissionMilestone {\n      milestoneId\n      category\n      __typename\n    }\n    __typename\n  }\n}\n"
  }

  const response = await fetch('https://apis.indeed.com/graphql?co=ID&locale=en-ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'referer':'https://employers.indeed.com/',
      'indeed-api-key': '0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae',
      'cookie': cookies,
    },
    body: JSON.stringify(requestBody),
  });

  const resJson = await response.json();

  return JSON.stringify(resJson);
}
