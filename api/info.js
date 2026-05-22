export default async function handler(req, res) {
  const { pageNo = 1, numOfRows = 10 } = req.query;
  const SERVICE_KEY = process.env.CAMP_API_KEY;

  // 1. http 대신보내주신 스크린샷의 'https' 주소로 변경
  // 2. 포맷 지정 파라미터를 type=json에서 _type=json으로 변경
  const baseUrl = 'https://apis.data.go.kr/1741000/auto_campgrounds/info';
  const url = `${baseUrl}?serviceKey=${SERVICE_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API response status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch campground data' });
  }
}
