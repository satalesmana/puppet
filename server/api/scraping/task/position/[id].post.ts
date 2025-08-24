import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';
import type { JobsResponseDataRoot } from '~/server/types/jobsResponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;
    let responseData = null;

    const { cookies, email } = await ScrapingAccount.findById({
      _id: params?.id,
    });

    const requestBody = {
        "operationName": "Jobs",
        "variables": {
            "input": {
                "pageSize": 20,
                "page": 1,
                "statuses": [
                    "ACTIVE",
                    "BLOCKED",
                    "PENDING_ACCOUNT_APPROVAL",
                    "SUSPENDED"
                ],
                "language": "en"
            }
        },
        "query": "query Jobs($input: JobsInput!) {\n  jobs(input: $input) {\n    ... on JobsResponseSuccess {\n      ...JobsList\n      __typename\n    }\n    ... on ResponseError {\n      __typename\n      error\n    }\n    __typename\n  }\n}\n\nfragment JobsList on JobsResponseSuccess {\n  result {\n    edges {\n      node {\n        ... on Job {\n          ...JobListItem\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    totalCount\n    __typename\n  }\n  __typename\n}\n\nfragment JobListItem on Job {\n  id\n  advertiserJobReference\n  owner {\n    fullName\n    __typename\n  }\n  createdDate\n  expiryDate\n  listingDate\n  locationId\n  locations {\n    description\n    country\n    __typename\n  }\n  postType\n  status\n  title\n  daysRemaining\n  candidatesCount\n  newCandidatesCount\n  canBeUpgraded\n  canBeRefreshed\n  performanceRating {\n    score\n    status\n    __typename\n  }\n  payPerPlacementEligibility {\n    ... on PayPerPlacementEligibleResponse {\n      redirectUrl\n      product\n      __typename\n    }\n    ... on PayPerPlacementNonEligibleResponse {\n      reason\n      __typename\n    }\n    __typename\n  }\n  isIndirectJobButCanBeChanged\n  __typename\n}"
    }

    const response = await fetch('https://id.employer.seek.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies}`,
      },
      body: JSON.stringify(requestBody),
    });
    const { data, errors } = await response.json() as JobsResponseDataRoot;

    if (errors) {
      throw new Error(`${errors[0].message}, lakukan login akun ${email} `);
    }
    if (data.jobs !== null) {
      responseData = data.jobs.result.edges;
    }

    return { data: responseData, message: '' } as ApiResponse<typeof responseData, string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
