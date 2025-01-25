import http from '@/utils/http'

export function loginApi(user){
    return http.post('/api/user/login',user);
}

export function getTeacherListAPI(){
    return http.get('/api/user/teacher');
}
