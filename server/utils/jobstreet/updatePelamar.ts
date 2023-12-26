import { ScrapingJobstreetPelamar } from '~/server/models/ScrapingPelamarJobstreet.model';
import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';

export const jobstreetUpdatePelamar = async () => {
  const pelamarGroup = await ScrapingJobstreetPelamar.findOne({
    updateBucket: '0',
  });

  const pelamar = await ScrapingJobstreetPelamar.find({
    updateBucket: '0',
    'scraping_task.positionId': pelamarGroup[0].scraping_task.positionId,
  }).limit(20);

  if (pelamar.length > 0) {
    const prospectData: any = [];
    pelamar.map((item, index) => {
      prospectData.push({ prospectId: item.id, positionInList: index + 1 });
      return index;
    });
    const requestBody = {
      operationName: 'UpdateStatusForProspectsWithContext',
      variables: {
        input: {
          prospectData,
          positionId: pelamarGroup[0].scraping_task.positionId,
          bucket: 'NOT_SUITABLE',
          statusChangeLocation: 'CandidateList',
        },
      },
      query:
        'mutation UpdateStatusForProspectsWithContext($input: UpdateStatusForProspectsWithContextInput!) {\n  updateStatusForProspectsWithContext(input: $input) {\n    success\n    __typename\n  }\n}',
    };

    const { cookies } = await ScrapingAccount.findOne({
      _id: pelamarGroup[0].scraping_account._id,
    });

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
  }
};
