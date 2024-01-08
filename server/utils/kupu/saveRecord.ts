export const getResumeDetail = async ({ cookies, applyId, jobId }: any) => {
  try {
    const requestBody = { applyId, jobId };

    const response = await fetch(
      `https://bisnis.kupu.id/prod-api/position/position/applyRead/v1/saveRecord`,
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

    return resJson;
  } catch (error) {
    console.log('getResumeDetail ', error);
    throw error;
  }
};
