export default defineEventHandler(async (event) => {
  try {
    const res = getMetadata(event);
    return res;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
