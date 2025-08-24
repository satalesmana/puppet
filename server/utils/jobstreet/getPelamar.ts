import { ScrapingJobstreetPelamar } from '../../models/ScrapingPelamarJobstreet.model';
import type { RootApplications } from '~/server/types/application.interface'

export const jobstreetFetchPelamar = async ({
  initialId,
  billerId,
  cookies,
  taskId,
  positionId,
}: any) => {
  try {
    const requestBody = {
        "operationName": "Applications",
        "variables": {
            "input": {
                "jobId": initialId,
                "pagination": {
                    "pageNumber": 1
                },
                "sort": {
                    "sortField": "RELEVANCE",
                    "orderBy": "DESC"
                },
                "filters": {
                    "searchText": "",
                    "homeLocationIds": [],
                    "questionnaireFilters": [],
                    "statusFolders": [
                        "INBOX"
                    ],
                    "nationalityRightToWorkIds": []
                }
            },
            "nationalitiesInput2": {
                "jobId": initialId
            },
            "displayLabelInput2": {
                "language": "en"
            },
            "countryNameInput2": {
                "language": "en"
            },
            "displayDescriptionInput2": {
                "language": "en",
                "displayFormat": "SHORT",
                "displayCountry": "ID"
            }
        },
        "query": "query Applications($input: ApplicationsInput!, $nationalitiesInput2: ApplicationProfileNationalitiesInput!, $displayLabelInput2: CandidateProfileRightToWorkDisplayLabelInput!, $countryNameInput2: CandidateProfileNationalityCountryNameInput!, $displayDescriptionInput2: LocationDisplayDescriptionInput!) {\n  applications(input: $input) {\n    ... on ApplicationsResponseSuccess {\n      result {\n        ...application\n        __typename\n      }\n      pageInfo {\n        pageNumber\n        pageSize\n        total\n        totalPages\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment application on Application {\n  id\n  adcentreCandidateId\n  adcentreProspectId\n  candidateId\n  applicationId\n  firstName\n  lastName\n  email\n  phone\n  mostRecentJobTitle\n  mostRecentCompanyName\n  mostRecentRoleMonths\n  appliedDateUtc\n  statusFolder\n  isRead\n  isPriorityApply\n  metadata {\n    ... on ApplicationMetadataResponseSuccess {\n      result {\n        emailCount\n        noteCount\n        hasResume\n        hasCoverLetter\n        hasSelectionCriteria\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  candidateStats {\n    ... on ApplicationCandidateStatsResponseSuccess {\n      result {\n        totalApplicationCount\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  rating {\n    rating\n    __typename\n  }\n  source\n  billableStatus\n  matchedQualities {\n    id\n    isTop\n    displayLabel\n    relevanceScore\n    __typename\n  }\n  attachmentsV2 {\n    ... on ApplicationAttachmentsV2ResponseSuccess {\n      result {\n        attachmentId\n        attachmentType\n        hasConvertedPdf\n        fileName\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  verifications {\n    ... on ApplicationVerificationsResponseSuccess {\n      result {\n        title\n        viewFields {\n          label\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  questionnaireSubmission {\n    ... on ApplicationQuestionnaireSubmissionResponseSuccess {\n      result {\n        id\n        questions {\n          id\n          legacyId\n          text\n          answers {\n            id\n            legacyId\n            text\n            verification {\n              title\n              viewFields {\n                label\n                value\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          status\n          answerType\n          source\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  profile {\n    ... on ResponseError {\n      error\n      __typename\n    }\n    ... on ApplicationProfileResponseSuccess {\n      result {\n        education {\n          id\n          name\n          completed\n          completionDate {\n            year\n            month\n            __typename\n          }\n          highlights\n          institute\n          credential {\n            name\n            values\n            __typename\n          }\n          verification {\n            title\n            viewFields {\n              label\n              value\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        licences {\n          id\n          name\n          issuingOrganisation\n          issueDate {\n            month\n            year\n            __typename\n          }\n          expiryDate {\n            month\n            year\n            __typename\n          }\n          noExpiryDate\n          description\n          formattedExpiryDate\n          credential {\n            name\n            values\n            __typename\n          }\n          verification {\n            title\n            viewFields {\n              label\n              value\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        skills {\n          keyword\n          __typename\n        }\n        workHistory {\n          id\n          title\n          company\n          startDate {\n            month\n            year\n            __typename\n          }\n          endDate {\n            month\n            year\n            __typename\n          }\n          achievements\n          __typename\n        }\n        rightsToWork {\n          country\n          answer\n          __typename\n        }\n        rightsToWorkV2 {\n          id\n          displayLabel(input: $displayLabelInput2)\n          __typename\n        }\n        verificationsStats {\n          ... on ApplicationProfileVerificationsStatsSuccess {\n            totalCount\n            __typename\n          }\n          ... on ResponseError {\n            error\n            __typename\n          }\n          __typename\n        }\n        verifications {\n          ... on ApplicationProfileVerificationsSuccess {\n            result {\n              verifiedIdentity {\n                viewFields {\n                  label\n                  value\n                  __typename\n                }\n                __typename\n              }\n              workHistory {\n                title\n                __typename\n              }\n              education {\n                title\n                __typename\n              }\n              licences {\n                title\n                __typename\n              }\n              rightToWork {\n                title\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          ... on ResponseError {\n            error\n            __typename\n          }\n          __typename\n        }\n        homeLocation {\n          id\n          displayDescription(input: $displayDescriptionInput2)\n          __typename\n        }\n        nationalities(input: $nationalitiesInput2) {\n          ... on ResponseError {\n            error\n            __typename\n          }\n          ... on ApplicationProfileNationalitiesResponseSuccess {\n            result {\n              id\n              countryName(input: $countryNameInput2)\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        referenceChecksStats {\n          ... on ApplicationProfileReferenceChecksStatsResponseSuccess {\n            result {\n              ... on ApplicationProfileReferenceChecksStatsRequested {\n                __typename\n                referenceCheckType\n              }\n              ... on ApplicationProfileReferenceChecksStatsAvailable {\n                referenceCheckType\n                finishedCount\n                totalCount\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  fit {\n    ... on ApplicationFitResponseSuccess {\n      result {\n        summary\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      __typename\n    }\n    __typename\n  }\n  __typename\n}"
    }
    // const requestBody = {
    //   operationName: 'ProspectsWithPaginationByJobId',
    //   variables: {
    //     sort: 'RELEVANCE',
    //     sortOrder: 'DESC',
    //     jobId: initialId,
    //     advertiserId: billerId,
    //     searchText: '',
    //     bucket: 'INBOX',
    //     pageNumber: 1,
    //   },
    //   query:
    //     'query ProspectsWithPaginationByJobId($jobId: ID!, $advertiserId: ID!, $searchText: String, $bucket: Bucket, $pageNumber: Int, $pageSize: Int, $filters: ProspectFilters) {\n  prospectsWithPaginationByJobId(\n    input: {jobId: $jobId, advertiserId: $advertiserId, searchText: $searchText, bucket: $bucket,  pageNumber: $pageNumber, pageSize: $pageSize, filters: $filters}\n  ) {\n    filterCounts {\n      rrFilterCounts {\n        id\n        count\n        __typename\n      }\n      __typename\n    }\n    bucketCounts {\n      newCount\n      viewedCount\n      inboxCount\n      prescreenCount\n      shortlistCount\n      interviewCount\n      offerCount\n      acceptCount\n      notSuitableCount\n      totalCount\n      __typename\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      preFilterTotal\n      total\n      totalPages\n      __typename\n    }\n    nodes {\n      ...prospect\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment prospect on Prospect {\n  id\n  billableStatus\n  candidateId\n  jobApplicationId\n  seekCandidateId\n  firstName\n  lastName\n  email\n  phone\n  mostRecentJobTitle\n  mostRecentCompanyName\n  mostRecentRoleMonths\n  appliedDate\n  bucket\n  isRead\n  submission {\n    __typename\n    ... on Submission {\n      roleRequirements {\n        ...roleRequirements\n        __typename\n      }\n      __typename\n    }\n    ... on Error {\n      message\n      __typename\n    }\n  }\n  attachments {\n    id\n    type\n    filename\n    isPdf\n    __typename\n  }\n  position\n  state\n  noteCount\n  emailCount\n  prospectCount\n  rating {\n    rating\n    __typename\n  }\n  verifications {\n    title\n    credentialInfo {\n      name\n      values\n      __typename\n    }\n    __typename\n  }\n  source\n  profile {\n    ...profile\n    __typename\n  }\n  matchedQualities {\n    qualities {\n      id\n      isTop\n      displayLabel\n      relevanceScore\n      __typename\n    }\n    hasError\n    __typename\n  }\n  __typename\n}\n\nfragment profile on Profile {\n  workHistory {\n    achievements\n    company {\n      text\n      __typename\n    }\n    startDate {\n      month\n      year\n      __typename\n    }\n    endDate {\n      month\n      year\n      __typename\n    }\n    id\n    title {\n      text\n      __typename\n    }\n    __typename\n  }\n  education {\n    id\n    name {\n      text\n      __typename\n    }\n    completed\n    completionDate {\n      year\n      month\n      __typename\n    }\n    highlights\n    institute {\n      text\n      __typename\n    }\n    credential {\n      ...credential\n      __typename\n    }\n    __typename\n  }\n  licences {\n    description\n    expiryDate {\n      month\n      year\n      __typename\n    }\n    formattedExpiryDate\n    credential {\n      ...credential\n      __typename\n    }\n    id\n    issueDate {\n      month\n      year\n      __typename\n    }\n    issuingOrganisation\n    name {\n      text\n      __typename\n    }\n    noExpiryDate\n    origin\n    __typename\n  }\n  skills {\n    keyword {\n      text\n      __typename\n    }\n    __typename\n  }\n  rightsToWork {\n    answer\n    country\n    __typename\n  }\n  __typename\n}\n\nfragment credential on BaseCredential {\n  credentialInfo {\n    name\n    values\n    __typename\n  }\n  __typename\n}\n\nfragment roleRequirements on RoleRequirement {\n  questionId\n  globalId\n  question\n  answerType\n  rrAnswers {\n    id\n    globalId\n    text\n    isVerified\n    __typename\n  }\n  score\n  status\n  verifications {\n    title\n    credentialInfo {\n      name\n      values\n      __typename\n    }\n    __typename\n  }\n  __typename\n}',
    // };


    const response = await fetch(
      'https://id.employer.seek.com/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies}`,
        },
        body: JSON.stringify(requestBody),
      },
    );
    const resJson = await response.json() as RootApplications;

    if (resJson.errors) {
      throw new Error(resJson.errors[0].message);
    }

    if (resJson.data) {
      if (resJson.data.applications.result !== null) {
        const res: any = [];
        const data = resJson.data.applications.result.map(
          (item: any, index: any) => {
            res.push({ prospectId: item.id, positionInList: index + 1 });
            return {
              ...item,
              scraping_task: {
                _id: taskId,
                biller_id: billerId,
                initial_id: initialId,
              },
            };
          },
        );
        ScrapingJobstreetPelamar.insertMany(data);
        return { data: res, positionId };
      }
    }
  } catch (error) {
    console.log('jobstreetFetchPelamar ', error);
    throw error;
  }
};
