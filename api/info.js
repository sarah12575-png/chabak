export default async function handler(req, res) {
  // 클라이언트가 보낸 쿼리 스트링 추출 (기본값 설정)
  const { pageNo = 1, numOfRows = 10 } = req.query;
  const SERVICE_KEY = process.env.CAMP_API_KEY; // Vercel 환경변수에서 인증키 로드

  const baseUrl = 'http://apis.data.go.kr/1741000/auto_campgrounds/info';
  // 데이터 포맷을 JSON으로 명시하여 호출합니다.
  const url = `${baseUrl}?serviceKey=${SERVICE_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=json`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API response status: ${response.status}`);
    }

    const data = await response.json(); // JSON 형식으로 데이터 파싱
    
    // 브라우저에 JSON 데이터 반환
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching campground info:', error);
    res.status(500).json({ error: 'Failed to fetch campground data' });
  }
}
