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
      "operationName": "AccountContext",
      "variables": {
          "skipAdvertiserContext": false,
          "skipCanClaimCompanyProfilePermission": true,
          "skipCanManageCompanyProfilePermission": true
      },
      "query": "query AccountContext($skipAdvertiserContext: Boolean = false, $skipCanClaimCompanyProfilePermission: Boolean = true, $skipCanManageCompanyProfilePermission: Boolean = true) {\n  hirerOriginZone\n  currentAdvertiser @skip(if: $skipAdvertiserContext) {\n    ... on CurrentAdvertiserContext {\n      __typename\n      name\n      seekId\n      isAgency\n      billingId\n      permissionOptions {\n        ...PermissionOptionFields\n        canManageCompanyProfile @skip(if: $skipCanManageCompanyProfilePermission)\n        canClaimCompanyProfile @skip(if: $skipCanClaimCompanyProfilePermission)\n        __typename\n      }\n      status\n      role\n    }\n    ... on Error {\n      __typename\n      message\n    }\n    __typename\n  }\n  currentUser {\n    ... on CurrentUserContext {\n      __typename\n      id\n      email\n      firstName\n      lastName\n      name\n      status\n    }\n    ... on Error {\n      __typename\n      message\n    }\n    __typename\n  }\n  headerFooterContext {\n    __typename\n    identityContext {\n      email\n      act {\n        operatorEmail\n        isCsView\n        __typename\n      }\n      __typename\n    }\n    user {\n      name\n      firstName\n      id\n      status\n      __typename\n    }\n    advertiser @skip(if: $skipAdvertiserContext) {\n      name\n      billingId\n      hasMultipleAccounts\n      permissionOptions {\n        ...PermissionOptionFields\n        canManageCompanyProfile @skip(if: $skipCanManageCompanyProfilePermission)\n        canClaimCompanyProfile @skip(if: $skipCanClaimCompanyProfilePermission)\n        __typename\n      }\n      showOnCreditHoldMessage\n      isActivationPending\n      switchAccountsHref\n      isAgency\n      __typename\n    }\n  }\n}\n\nfragment PermissionOptionFields on PermissionOptions {\n  canCreateJobs\n  canManageBrand\n  canManageUsers\n  canViewInsightsRoleReport\n  canPayInvoices\n  canViewInvoiceHistory\n  canViewManagerReports\n  canViewPremiumTalentSearch\n  canManageJob\n  __typename\n}"
    }

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
