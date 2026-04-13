import { objToParam } from '../helpers';
import type { ApiResponse } from '~/server/types/apiresponse.interface';
import { ScrapingGlintsPelamar } from '../../models/ScrapingPelamarGlints.model';
import { RootFetchPelamar, Application } from "../../types/glintsFetchApplicantResponse.interface"

export const onFetchGlintsAplicant = async ({ cookies, jobId, taskId }: any) => {
  try {
      const param = objToParam({
        includeApplication:true,
        includeStatusBreakdown:true,
        limit: 25,
        offset:0,
        order: "createdAt DESC",
        where: JSON.stringify({"JobId":jobId,"status":"IN_REVIEW"})
      });


      const res = await fetch(`https://employers.glints.id/api/v2/v2/jobs/${jobId}/applications?${param}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${cookies}`,
        },
      });
      const resJson = await res.json() as RootFetchPelamar;

      if (resJson.data) {
        if (resJson.data.applications !== null) {
          const res: any = [];
          const data = resJson.data.applications.map((item: Application) => {
              res.push(item.id)
              return {
                firstName: item.Applicant.firstName,
                lastName: item.Applicant.lastName,
                gender: item.Applicant.gender,
                location: item.Applicant.location,
                phoneNumber: item.whatsAppDetails.whatsAppNumber,
                email: item.Applicant.email,
                scraping_task: {
                _id: taskId,
              },
              };
            },
          );
          ScrapingGlintsPelamar.insertMany(data);
          return { data: res };
        }
      }
    } catch (error) {
      return error as ApiResponse<[], string>;
    }
};

export const onUpdateGlintsAplicant = async ({ cookies, jobId, applicationIds }: any) => {
  try {
      const body = {
        data:{
          updates: [] as Array<{ applicationId: any; status: string; rejectionReasons: string[] }>,
          source: "Manage Candidate",
          eagerUpdateChannel: true
        }
      }

      applicationIds.forEach((id: any) => body.data.updates.push({
        applicationId: id,
        status: "REJECTED",
        rejectionReasons: ["OTHER"]
      }))

      const res = await fetch(`https://employers.glints.id/api/v2/v2/jobs/${jobId}/applications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${cookies}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return { data, message: '' } as ApiResponse<[], string>;
    } catch (error) {
      return error as ApiResponse<[], string>;
    }
}
