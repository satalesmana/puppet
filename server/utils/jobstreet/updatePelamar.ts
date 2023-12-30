export const jobstreetUpdatePelamar = async ({
  prospectData,
  positionId,
  cookies,
}: any) => {
  const requestBody = {
    operationName: 'UpdateStatusForProspectsWithContext',
    variables: {
      input: {
        prospectData,
        positionId,
        bucket: 'NOT_SUITABLE',
        statusChangeLocation: 'CandidateList',
      },
    },
    query:
      'mutation UpdateStatusForProspectsWithContext($input: UpdateStatusForProspectsWithContextInput!) {\n  updateStatusForProspectsWithContext(input: $input) {\n    success\n    __typename\n  }\n}',
  };

  const response = await fetch(
    'https://id.employer.seek.com/cm-graphql-api/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies}`,
      },
      body: JSON.stringify(requestBody),
    },
  );
  const resJson = await response.json();
  if (resJson.errors) {
    throw new Error(resJson.errors[0].message);
  }

  return JSON.stringify(resJson);
};
