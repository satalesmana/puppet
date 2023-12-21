import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import { ScrapingTask } from '~/server/models/ScrapingTask.model';
import { ScrapingJobstreetPelamar } from '~/server/models/ScrapingPelamarJobstreet.model';

export const jobstreetFetchPelamar = async () => {
  try {
    const resTask = await ScrapingTask.find({ status: 'open' });
    if (resTask.length > 0) {
      const { cookies } = await ScrapingAccount.findOne({
        _id: resTask[0].scraping_account._id,
      });
      const requestBody = {
        operationName: 'ProspectsWithPaginationByJobId',
        variables: {
          sort: 'RELEVANCE',
          sortOrder: 'DESC',
          jobId: resTask[0].initial_id,
          advertiserId: resTask[0].biller_id,
          searchText: '',
          bucket: 'INBOX',
          pageNumber: 1,
        },
        query:
          'query ProspectsWithPaginationByJobId($jobId: ID!, $advertiserId: ID!, $searchText: String, $bucket: Bucket, $pageNumber: Int, $pageSize: Int, $filters: ProspectFilters) {\n  prospectsWithPaginationByJobId(\n    input: {jobId: $jobId, advertiserId: $advertiserId, searchText: $searchText, bucket: $bucket,  pageNumber: $pageNumber, pageSize: $pageSize, filters: $filters}\n  ) {\n    filterCounts {\n      rrFilterCounts {\n        id\n        count\n        __typename\n      }\n      __typename\n    }\n    bucketCounts {\n      newCount\n      viewedCount\n      inboxCount\n      prescreenCount\n      shortlistCount\n      interviewCount\n      offerCount\n      acceptCount\n      notSuitableCount\n      totalCount\n      __typename\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      preFilterTotal\n      total\n      totalPages\n      __typename\n    }\n    nodes {\n      ...prospect\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment prospect on Prospect {\n  id\n  billableStatus\n  candidateId\n  jobApplicationId\n  seekCandidateId\n  firstName\n  lastName\n  email\n  phone\n  mostRecentJobTitle\n  mostRecentCompanyName\n  mostRecentRoleMonths\n  appliedDate\n  bucket\n  isRead\n  submission {\n    __typename\n    ... on Submission {\n      roleRequirements {\n        ...roleRequirements\n        __typename\n      }\n      __typename\n    }\n    ... on Error {\n      message\n      __typename\n    }\n  }\n  attachments {\n    id\n    type\n    filename\n    isPdf\n    __typename\n  }\n  position\n  state\n  noteCount\n  emailCount\n  prospectCount\n  rating {\n    rating\n    __typename\n  }\n  verifications {\n    title\n    credentialInfo {\n      name\n      values\n      __typename\n    }\n    __typename\n  }\n  source\n  profile {\n    ...profile\n    __typename\n  }\n  matchedQualities {\n    qualities {\n      id\n      isTop\n      displayLabel\n      relevanceScore\n      __typename\n    }\n    hasError\n    __typename\n  }\n  __typename\n}\n\nfragment profile on Profile {\n  workHistory {\n    achievements\n    company {\n      text\n      __typename\n    }\n    startDate {\n      month\n      year\n      __typename\n    }\n    endDate {\n      month\n      year\n      __typename\n    }\n    id\n    title {\n      text\n      __typename\n    }\n    __typename\n  }\n  education {\n    id\n    name {\n      text\n      __typename\n    }\n    completed\n    completionDate {\n      year\n      month\n      __typename\n    }\n    highlights\n    institute {\n      text\n      __typename\n    }\n    credential {\n      ...credential\n      __typename\n    }\n    __typename\n  }\n  licences {\n    description\n    expiryDate {\n      month\n      year\n      __typename\n    }\n    formattedExpiryDate\n    credential {\n      ...credential\n      __typename\n    }\n    id\n    issueDate {\n      month\n      year\n      __typename\n    }\n    issuingOrganisation\n    name {\n      text\n      __typename\n    }\n    noExpiryDate\n    origin\n    __typename\n  }\n  skills {\n    keyword {\n      text\n      __typename\n    }\n    __typename\n  }\n  rightsToWork {\n    answer\n    country\n    __typename\n  }\n  __typename\n}\n\nfragment credential on BaseCredential {\n  credentialInfo {\n    name\n    values\n    __typename\n  }\n  __typename\n}\n\nfragment roleRequirements on RoleRequirement {\n  questionId\n  globalId\n  question\n  answerType\n  rrAnswers {\n    id\n    globalId\n    text\n    isVerified\n    __typename\n  }\n  score\n  status\n  verifications {\n    title\n    credentialInfo {\n      name\n      values\n      __typename\n    }\n    __typename\n  }\n  __typename\n}',
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

      if (resJson.data) {
        if (resJson.data.prospectsWithPaginationByJobId.nodes !== null) {
          const data = resJson.data.prospectsWithPaginationByJobId.nodes.map(
            (item: any) => {
              return {
                ...item,
                scraping_task: resTask[0],
              };
            },
          );
          ScrapingJobstreetPelamar.insertMany(data);
        }
      }
    }
  } catch (error) {
    console.log('jobstreetFetchPelamar ', error);
  }
};
