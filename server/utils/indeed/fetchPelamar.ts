import type { IndeedFetchPelamanrReq, RootIndeedPelamar, DataIndeedPelamar } from '~/server/types/indeedPelamarReqResponse.interface'
import { ScrapingIndeedPelamar } from '../../models/ScrapingPelamarIndeed.model';

interface DeleteData {
  candidateSubmissionId:string,
  jobId: string
}

const  mapCandidates=(response:DataIndeedPelamar, jobId:string, taskId:string)=> {
  const deleteData:DeleteData[] = []

  const data = response?.findRCPMatches?.matchConnection?.matches?.map(
    ({ candidateSubmission }) => {
      const profile = candidateSubmission?.data?.profile;
      const displayName = profile?.name?.displayName || "";
      const nameParts = displayName.trim().split(/\s+/);

      deleteData.push({
        candidateSubmissionId: candidateSubmission.id,
        jobId: jobId
      })
      const phoneNumber = profile?.contact?.phoneNumber || ""
      return {
        firstName: nameParts.shift() || "",
        lastName: nameParts.join(" "),
        location: profile?.location?.location || "",
        phoneNumber: phoneNumber.replaceAll(" ", ""),
        email: "",
        scraping_task: {
          _id: taskId,
        },
      };
    }
  ) || [];

  return {
    data,
    deleteData
  }
}

export const indeedFetchPelamar = async ({
  cookies,
  positionId,
  initial_id,
  taskId
}:IndeedFetchPelamanrReq)=>{
  try {
    const requestBody={
      "operationName": "FindRCPMatches",
      "variables": {
        "input": {
          "clientSurfaceName": "candidate-list-page",
          "defaultStrategyId": "U20GF",
          "limit": 20,
          "context": {
            "surfaceContext": [
              {
                "contextKey": "DISPOSITION",
                "contextPayload": "NEW"
              },
              {
                "contextKey": "CREATEDAFTER",
                "contextPayload": "1721581200000"
              },
              {
                "contextKey": "SORT_BY",
                "contextPayload": "APPLY_DATE"
              },
              {
                "contextKey": "SORT_ORDER",
                "contextPayload": "DESCENDING"
              }
            ]
          },
          "identifiers": {
            "jobIdentifiers": {
              "employerJobId": initial_id
            }
          }
        }
      },
      "query": "query FindRCPMatches($input: OrchestrationMatchesInput!) { findRCPMatches(input: $input) { matchConnection { matches { candidateSubmission { id data { profile { name { displayName } location { country location } contact { phoneNumber } } } } } } } }"
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

    const resJson = await response.json() as RootIndeedPelamar;

    if (resJson.errors) {
      console.log('resJson', resJson)
      throw new Error(resJson.errors[0].message);
    }

    if (resJson.data) {
      const resMap = mapCandidates(resJson.data, positionId, taskId)
      await ScrapingIndeedPelamar.insertMany(resMap.data);

      return resMap.deleteData
    }

    return []
  } catch (error) {
    console.log('indeedFetchPelamar ', error);
    throw error;
  }
}
