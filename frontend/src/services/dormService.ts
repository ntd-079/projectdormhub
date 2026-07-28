export interface Dormitory {
  id: number;
  name: string;
  phone: string;
  water_fee: number;
  electricity_fee: number;
  monthly_rent: number;
  gender_type: string;
  room_type: string;
  image_url?: string | null;
  location_id?: number | null;
  location_name?: string;
}

const getApiBaseUrl = () => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    // @ts-ignore
    return `${import.meta.env.VITE_API_URL}/api`;
  }
  return 'http://localhost:5000/api';
};

/**
 * Fetch recommended dormitories from database endpoint /api/dormitories/recommended
 */
export async function getRecommendedDormitories(limit = 6): Promise<Dormitory[]> {
  const baseUrl = getApiBaseUrl();
  try {
    let response = await fetch(`${baseUrl}/dormitories/recommended?limit=${limit}`);
    
    // Fallback to port 4000 if 5000 fails
    if (!response.ok && baseUrl.includes('5000')) {
      response = await fetch(`http://localhost:4000/api/dormitories/recommended?limit=${limit}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return Array.isArray(result) ? result : (result.data || []);
  } catch (error) {
    console.warn('Failed to fetch recommended dormitories from database API, using fallback data:', error);
    return getFallbackDormitories();
  }
}

/**
 * Fetch all dormitories from database endpoint /api/dormitories
 */
export async function getAllDormitories(): Promise<Dormitory[]> {
  const baseUrl = getApiBaseUrl();
  try {
    let response = await fetch(`${baseUrl}/dormitories`);
    if (!response.ok && baseUrl.includes('5000')) {
      response = await fetch(`http://localhost:4000/api/dormitories`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return Array.isArray(result) ? result : (result.data || []);
  } catch (error) {
    console.warn('Failed to fetch dormitories from database API, using fallback data:', error);
    return getFallbackDormitories();
  }
}

/**
 * Fallback mock data if database server is not reachable during development
 */
function getFallbackDormitories(): Dormitory[] {
  return [
    {
      id: 1,
      name: 'หอหรู',
      phone: '0819705509',
      water_fee: 25,
      electricity_fee: 8,
      monthly_rent: 3500,
      gender_type: 'หอรวม',
      room_type: 'ห้องแอร์',
      image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'หอปันปัน',
      phone: '0918748623',
      water_fee: 18,
      electricity_fee: 5.8,
      monthly_rent: 3000,
      gender_type: 'หอรวม',
      room_type: 'ห้องแอร์',
      image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'หอพรรณีเรสซิเดนซ์',
      phone: '0965821223',
      water_fee: 13,
      electricity_fee: 7,
      monthly_rent: 4000,
      gender_type: 'หอรวม',
      room_type: 'ห้องแอร์',
      image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'
    }
  ];
}
