import http from '@/utils/http'

export function loginApi(user){
    return http.post('/api/user/login',user);
}

export function getTeacherListAPI(){
    return http.get('/api/user/teacher');
}

export function ForgotPasswordAPI(email) {
    return http.post(`/api/user/forgot-password?email=${encodeURIComponent(email)}`);
}

export function getUserProfileAPI(){
    return http.get('/api/user/profile');
}

export function RegisterAPI(register) {
    return http.post('/api/user/register',register);
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