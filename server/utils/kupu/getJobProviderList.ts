import { objToParam } from '../helpers';

interface JobProvider {
  id: String;
  approveId: String;
  userJobId: String;
  jobTitle: String;
  jobType: String;
  jobTypeName: String;
  updateTime: String;
  updateTimeFormat1: String;
  status: String;
}

export const getJobProviderList = async ({ cookies }: any) => {
  try {
    const param = objToParam({
      currentPage: 1,
      pageSize: 100,
      jobTitle: '',
      status: '',
      pageNum: 1,
      queryType: 1,
    });
    const response = await fetch(
      `https://bisnis.kupu.id/prod-api/position/jobApprove/v1/getJobProviderList?${param}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies}`,
          Device: 'pc',
          Platform: 'home',
        },
      },
    );
    const resJson = await response.json();
    if (resJson.code !== 0) {
      throw new Error(resJson.message);
    }

    return resJson.body.records as JobProvider[];
  } catch (error) {
    console.log('kupuFetchList ', error);
    throw error;
  }
};
