export const jobstreetUpdatePelamar = async ({
  prospectData,
  positionId,
  cookies,
}: any) => {
  const ids = prospectData.map((item: any) => item.id);

  const requestBody = {
      "operationName": "BulkUpdateApplicationStatus",
      "variables": {
          "input": {
              "jobId": positionId,
              "statusFolder": "NOT_SUITABLE",
              "ids": ids
          }
      },
      "extensions": {
          "clientLibrary": {
              "name": "@apollo/client",
              "version": "4.2.12"
          }
      },
      "query": "mutation BulkUpdateApplicationStatus($input: BulkUpdateApplicationStatusInput!) {\n  bulkUpdateApplicationStatus(input: $input) {\n    ... on BulkUpdateApplicationStatusResponseSuccess {\n      failureCount\n      successCount\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n}"
  }

  const response = await fetch('https://id.employer.seek.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies}`,
    },
    body: JSON.stringify(requestBody),
  });
  const resJson = await response.json();

  return JSON.stringify(resJson);
};
