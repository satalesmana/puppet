import { Types } from 'mongoose';
import { ScrapingJobstreetPelamar } from '../../models/ScrapingPelamarJobstreet.model';
import { ScrapingTask } from '../../models/ScrapingTask.model';
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
        "operationName": "FetchApplications",
        "variables": {
            "input": {
                "jobId": initialId,
                "pagination": {
                    "pageNumber": 2
                },
                "sort": {
                    "sortField": "APPLICATION_DATE",
                    "orderBy": "DESC"
                },
                "filters": {
                    "searchText": "",
                    "questionnaireFilters": [],
                    "statusFolders": [
                        "INBOX"
                    ]
                }
            },
            "nationalitiesInput2": {
                "jobId": initialId
            },
            "displayLabelInput2": {
                "language": "id"
            },
            "countryNameInput2": {
                "language": "id"
            },
            "displayDescriptionInput2": {
                "language": "id",
                "displayFormat": "SHORT",
                "displayCountry": "ID"
            }
        },
        query: "query FetchApplications($input: ApplicationsInput!, $nationalitiesInput2: ApplicationProfileNationalitiesInput!, $displayLabelInput2: CandidateProfileRightToWorkDisplayLabelInput!, $countryNameInput2: CandidateProfileNationalityCountryNameInput!, $displayDescriptionInput2: LocationDisplayDescriptionInput!) {\n  applications(input: $input) {\n    ... on ApplicationsResponseSuccess {\n      result {\n        ...application\n        __typename\n      }\n      pageInfo {\n        pageNumber\n        pageSize\n        total\n        totalPages\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment application on Application {\n  id\n  adcentreCandidateId\n  adcentreProspectId\n  candidateId\n  applicationId\n  firstName\n  lastName\n  email\n  phone\n  mostRecentJobTitle\n  mostRecentCompanyName\n  mostRecentRoleMonths\n  appliedDateUtc\n  statusFolder\n  isRead\n  isPriorityApply\n  emailCount {\n    ... on ApplicationEmailCountResponseSuccess {\n      result {\n        value\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  candidateStats {\n    ... on ApplicationCandidateStatsResponseSuccess {\n      result {\n        totalApplicationCount\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  rating {\n    rating\n    __typename\n  }\n  source\n  billableStatus\n  matchedQualities {\n    id\n    isTop\n    displayLabel\n    relevanceScore\n    __typename\n  }\n  attachmentsV2 {\n    ... on ApplicationAttachmentsV2ResponseSuccess {\n      result {\n        attachmentId\n        attachmentType\n        hasConvertedPdf\n        fileName\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  verifications {\n    ... on ApplicationVerificationsResponseSuccess {\n      result {\n        title\n        viewFields {\n          label\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  questionnaireSubmission {\n    ... on ApplicationQuestionnaireSubmissionResponseSuccess {\n      result {\n        id\n        questions {\n          id\n          legacyId\n          text\n          answers {\n            id\n            legacyId\n            text\n            verification {\n              title\n              viewFields {\n                label\n                value\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          status\n          answerType\n          source\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  profile {\n    ... on ResponseError {\n      error\n      __typename\n    }\n    ... on ApplicationProfileResponseSuccess {\n      result {\n        education {\n          id\n          name\n          completed\n          completionDate {\n            year\n            month\n            __typename\n          }\n          highlights\n          institute\n          credential {\n            name\n            values\n            __typename\n          }\n          verification {\n            title\n            viewFields {\n              label\n              value\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        licences {\n          id\n          name\n          issuingOrganisation\n          issueDate {\n            month\n            year\n            __typename\n          }\n          expiryDate {\n            month\n            year\n            __typename\n          }\n          noExpiryDate\n          description\n          formattedExpiryDate\n          credential {\n            name\n            values\n            __typename\n          }\n          verification {\n            title\n            viewFields {\n              label\n              value\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        skills {\n          keyword\n          __typename\n        }\n        workHistory {\n          id\n          title\n          company\n          startDate {\n            month\n            year\n            __typename\n          }\n          endDate {\n            month\n            year\n            __typename\n          }\n          achievements\n          __typename\n        }\n        rightsToWork {\n          country\n          answer\n          __typename\n        }\n        rightsToWorkV2 {\n          id\n          displayLabel(input: $displayLabelInput2)\n          __typename\n        }\n        verificationsStats {\n          ... on ApplicationProfileVerificationsStatsSuccess {\n            totalCount\n            __typename\n          }\n          ... on ResponseError {\n            error\n            __typename\n          }\n          __typename\n        }\n        verifications {\n          ... on ApplicationProfileVerificationsSuccess {\n            result {\n              verifiedIdentity {\n                viewFields {\n                  label\n                  value\n                  __typename\n                }\n                __typename\n              }\n              workHistory {\n                title\n                __typename\n              }\n              education {\n                title\n                __typename\n              }\n              licences {\n                title\n                __typename\n              }\n              rightToWork {\n                title\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          ... on ResponseError {\n            error\n            __typename\n          }\n          __typename\n        }\n        homeLocation {\n          id\n          displayDescription(input: $displayDescriptionInput2)\n          __typename\n        }\n        nationalities(input: $nationalitiesInput2) {\n          ... on ResponseError {\n            error\n            __typename\n          }\n          ... on ApplicationProfileNationalitiesResponseSuccess {\n            result {\n              id\n              countryName(input: $countryNameInput2)\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        referenceChecksStats {\n          ... on ResponseError {\n            error\n            __typename\n          }\n          ... on ApplicationProfileReferenceChecksStatsResponseSuccess {\n            result {\n              ... on ApplicationProfileReferenceChecksStatsRequested {\n                __typename\n                referenceCheckType\n              }\n              ... on ApplicationProfileReferenceChecksStatsAvailable {\n                referenceCheckType\n                finishedCount\n                totalCount\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  fit {\n    ... on ApplicationFitResponseSuccess {\n      result {\n        summaryV2\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      __typename\n    }\n    __typename\n  }\n  fitLevelV2\n  candidateHighlights {\n    ... on ApplicationCandidateHighlightsResponseSuccess {\n      result {\n        highlights\n        id\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  fitGeneration {\n    ... on ApplicationFitGenerationResponseSuccess {\n      result {\n        ... on Application_FitGenerationCompleted {\n          __typename\n        }\n        ... on Application_FitGenerationInProgress {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  noteCount {\n    ... on ApplicationNoteCountResponseSuccess {\n      result\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n    __typename\n  }\n  voiceScreeningInvitationStatus {\n    __typename\n    ... on ApplicationVoiceScreeningInvitationStatusResponseSuccess {\n      result {\n        id\n        value\n        __typename\n      }\n      __typename\n    }\n    ... on ResponseError {\n      error\n      __typename\n    }\n  }\n  __typename\n}"
    }

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

    const { data, errors } = await response.json()  as RootApplications;


    if (errors) {
      console.log('resJson',JSON.stringify(errors))
      throw new Error(JSON.stringify(errors));
    }

    if (data) {
      if (data.applications.result !== null) {
        const res: any = [];
        const insertData = data.applications.result.map(
          (item: any, index: any) => {
            res.push({ prospectId: item.adcentreProspectId, positionInList: index + 1 });
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
        ScrapingJobstreetPelamar.insertMany(insertData);
        return { data: res, positionId };
      }
    }
  } catch (error) {
    ScrapingTask.updateOne({ _id: new Types.ObjectId(taskId) }, { status: 'failed' });
    console.log('jobstreetFetchPelamar ', error);
    throw error;
  }
};
