import http from '@/utils/http'

export function loginApi(user){
    return http.post('/api/user/login',user);
}