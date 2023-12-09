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
      operationName: 'GetDashboardJobs',
      variables: {},
      query:
        'query GetDashboardJobs { hirerDashboardJobs(input: {maxResults: 5}) {   jobs {title,status,kind,positionId,listingId,jobId,draftId,numberOfCandidates,numberOfNewCandidates,startDateUtc,canBeRefreshed,daysRemaining,location {        description        __typename      }      performanceRating {        status        score        __typename      }      listPosition      talentSearchJobHref      __typename    }    lastDraft {      title      draftId      location {        description        __typename      }      __typename    }    directCounts {      draft      posted      expired      __typename    }    indirectCounts {      draft      posted      expired      __typename    }    __typename  }}',
    };
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
