import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';
import type { JobsResponseDataRoot } from '~/server/types/jobsResponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;
    let responseData = null;

    const { cookies, email } = await ScrapingAccount.findById({
      _id: params?.id,
    });

    const requestBody = {
      "operationName": "JobCardListMfe_EmployerJobSearch",
      "variables": {
          "input": {
              "filter": {
                  "allOf": [
                      {
                          "anyOf": [
                              {
                                  "not": {
                                      "hostedJobStatus": [
                                          "CLOSED",
                                          "PAUSED"
                                      ]
                                  }
                              }
                          ]
                      }
                  ],
                  "claimed": false,
                  "createdOnIndeed": true
              },
              "limit": 25,
              "sort": [
                  {
                      "sortDirection": "DESC",
                      "sortField": "datePostedOnIndeed"
                  }
              ]
          },
          "messagingTagJobPostStatusInput": {
              "surfaceContexts": [
                  {
                      "placementId": "indeed",
                      "statusCommunicationSettings": {
                          "communicationInterfaceName": "DradisIndeedMessage",
                          "communicationLocale": "en"
                      }
                  }
              ]
          },
          "sponsor_reopen_modal_2025_revamp1": true,
          "P_visapi_migration_visibility_level1_active": false,
          "P_jobman_underperformance_icon_01": false,
          "P_jobman_assignments_active": false,
          "P_sponsor_job_audit_api_migration_active": false,
          "P_sponsor_budget_info_migration_1": true,
          "P_visapi_migration_visibility_level_1": true,
          "P_visapi_migration_visibility_level_active": true,
          "P_jobman_no_billing_ijm_01": true,
          "P_jobman_multi_seat_location_filter_active": false,
          "P_candauto_jp_launch_active": true,
          "P_jobs_asst_posting_flow_no_sponsor_active": false,
          "P_campaign_priority_selection_active": false,
          "P_exclude_jp_active": true,
          "P_billing_identifiers_on_jobs_page_active": false,
          "P_sponsor_campaign_connection_migration_metrics_active": false,
          "P_jobman_roi_alert_benchmark_active": false,
          "P_jobman_churned_spender_v2_promo_01": false,
          "P_jobposting_exp_free_trial_reminder_01": false,
          "P_jobman_jobs_list_tips_alert_01": false,
          "P_jobman_optimization_recommendations_jobdetails_norm_title_active": true,
          "P_jobman_optimization_recommendations_jobdetails_salary_active": true,
          "P_jobman_optimization_recommendations_jobdetails_benefit_active": true,
          "P_jobman_optimization_recommendations_jobdetails_education_active": true,
          "P_jobman_optimization_recommendations_jobdetails_skill_active": false,
          "P_jobman_auto_assignments_active": true
      },
      "extensions": {
          "remoteFragmentStats": {
              "fragmentCount": 24,
              "elapsedTime": 125
          }
      },
      "query": "query JobCardListMfe_EmployerJobSearch($input: FindEmployerJobsInput!) { findEmployerJobs(input: $input) { results { employerJob { jobData { title id ... on HostedJobPost { legacyId } __typename }}} }}"
    }


    const response = await fetch('https://apis.indeed.com/graphql?co=ID&locale=en-ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'referer':'https://employers.indeed.com/',
        'indeed-api-key': '0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae',
        'cookie': cookies,
      },
      body: JSON.stringify(requestBody),
    });
    const { data, errors } = await response.json() ;

    if (errors) {
      throw new Error(`${errors[0].message}, lakukan login akun ${email} `);
    }

    const output = data.findEmployerJobs.results.map(
        ({ employerJob }:any) => ({
          id: employerJob.jobData.id,
          title: employerJob.jobData.title
        })
      )

    return { data: output, message: '' };
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
