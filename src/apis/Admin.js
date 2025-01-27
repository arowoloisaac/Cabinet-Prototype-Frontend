import http from '@/utils/http'

export function getRegisterRequestApi(){
    return http.post('/api/get-requests');
}
