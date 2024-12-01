import http from '@/utils/http'

export function loginApi(user){
    return http.post('/api/user/login',user);
}

// Fetch the user's profile information
// New API to get the user's profile
export function getProfileApi(){
    return http.get('/api/user/profile');
}

// New API to update the user's profile
export function updateProfileApi(profileData){
    return http.put('/api/user/profile', profileData);
}