import { objToParam } from '../helpers';
interface ResumeDetail {
  realName: String;
  gender: String;
  status: String;
  phone: String;
  age: String;
  email: String;
  photo: String;
  height: String;
  weight: String;
  birthday: String;
  birthdayUS: String;
  religion: String;
  religionName: String;
  userVerified: String;
  healthVerified: String;
  userRoleStatus: String;
  workingYears: String;
  workingYearsStr: String;
  workingYearsFormat: String;
  resumeId: String;
  levelCode: String;
  levelName: String;
  phoneVerified: String;
  emailVerified: String;
  openFlag: String;
  provinceId: String;
  cityId: String;
  areaId: String;
  postalCode: String;
  videosUrl: String;
  bindMgmCode: String;
  bindReferralCode: String;
  bindReferralType: String;
  currentAddress: String;
  ageFmt: String;
}

export const getResumeDetail = async ({ cookies, jobId, userId }: any) => {
  try {
    const param = objToParam({
      jobId,
      userId,
      searchInterviewVideo: 1,
      sourceName: 'applied',
    });

    const response = await fetch(
      `https://bisnis.kupu.id/prod-api/resume/v2/getResumeDetail?${param}`,
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

    return resJson.body.userDto as ResumeDetail[];
  } catch (error) {
    console.log('getResumeDetail ', error);
    throw error;
  }
};
