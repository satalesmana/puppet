import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;
    let responseData = [];

    const { cookies, email } = await ScrapingAccount.findById({
      _id: params?.id,
    });

    const requestBody = {
      "operationName": "GetDashboardJobs",
      "variables": {},
      "query": "query GetDashboardJobs {\n  hirerDashboardJobs(input: {maxResults: 5}) {\n    jobs {\n      ...HirerDashboardDraftItem\n      ...HirerDashboardJobItem\n      __typename\n    }\n    lastDraft {\n      title\n      draftId\n      location {\n        description\n        __typename\n      }\n      __typename\n    }\n    directCounts {\n      draft\n      posted\n      expired\n      __typename\n    }\n    indirectCounts {\n      draft\n      posted\n      expired\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment HirerDashboardDraftItem on HirerDashboardDraftItem {\n  title\n  draftId\n  kind\n  draftLocation: location {\n    description\n    __typename\n  }\n  __typename\n}\n\nfragment HirerDashboardJobItem on HirerDashboardJobItem {\n  title\n  status\n  kind\n  positionId\n  listingId\n  jobId\n  numberOfCandidates\n  numberOfNewCandidates\n  startDateUtc\n  canBeRefreshed\n  canBeUpgraded\n  daysRemaining\n  location {\n    description\n    __typename\n  }\n  performanceRating {\n    status\n    score\n    __typename\n  }\n  listPosition\n  talentSearchJobHref\n  __typename\n}"
    }
    const response = await fetch('https://id.employer.seek.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies}`,
      },
      body: JSON.stringify(requestBody),
    });
    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(`${errors[0].message}, lakukan login akun ${email} `);
    }

    if (data.hirerDashboardJobs.jobs !== null) {
      responseData = data.hirerDashboardJobs.jobs;
    }

    return { data: responseData, message: '' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
