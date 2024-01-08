interface AppliedResume {
  resumeId: String;
  userId: String;
  userRoleId: String;
  realName: String;
  openFlag: Number;
  talentFlag: Number;
  workYearsFmt: String;
  educationMaxFmt: String;
}

export const getResumeList = async ({ cookies, jobId }: any) => {
  try {
    const requestBody = {
      pageNum: 1,
      pageSize: 10,
      jobId,
      queryType: 1,
      viewStatus: 2005,
      specialSearchList: null,
      searchList: [],
    };

    const response = await fetch(
      `https://bisnis.kupu.id/prod-api/position/candidates/position/appliedResumeList`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies}`,
          Device: 'pc',
          Platform: 'home',
        },
        body: JSON.stringify(requestBody),
      },
    );
    const resJson = await response.json();
    if (resJson.code !== 0) {
      throw new Error(resJson.message);
    }

    return resJson.body.records as AppliedResume[];
  } catch (error) {
    console.log('kupuGetResumeList ', error);
    throw error;
  }
};
