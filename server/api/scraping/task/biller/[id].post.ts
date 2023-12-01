import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;
    const body = await readBody(event);
    const positionId = body.position_id;
    let responseData = {};

    const { cookies } = await ScrapingAccount.findById({
      _id: params?.id,
    });

    const requestBody = {
      operationName: 'HeaderFooterContext',
      variables: {
        headerFooterContextInput: {
          location: {
            pathname: '/id/candidates/',
            search: `?id=${positionId}`,
          },
        },
      },
      query:
        'query HeaderFooterContext($headerFooterContextInput: HeaderFooterContextInput) {\n  headerFooterContext {\n    identityContext {\n      act(input: $headerFooterContextInput) {\n        operatorEmail\n        csToggleHref\n        isCsView\n        __typename\n      }\n      email\n      __typename\n    }\n    advertiser {\n      billingId\n      hasMultipleAccounts\n      isActivationPending\n      isAgency\n      name\n      permissions\n      showOnCreditHoldMessage\n      switchAccountsHref\n      __typename\n    }\n    user {\n      name\n      firstName\n      id\n      __typename\n    }\n    __typename\n  }\n}',
    };
    const response = await fetch('https://id.employer.seek.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies}`,
      },
      body: JSON.stringify(requestBody),
    });
    const { data } = await response.json();
    if (data.headerFooterContext.advertiser !== null) {
      responseData = data.headerFooterContext.advertiser;
    }

    return { data: responseData, message: '' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
