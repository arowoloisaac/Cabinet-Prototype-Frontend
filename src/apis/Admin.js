import http from '@/utils/http'

export function getRegisterRequestApi(){
    return http.get('/api/get-requests');
}

export function AddUserApi(id){
    return http.post(`/api/add-user/${id}`);
}

export function DenyUserApi(id){
    return http.put(`/api/deny-user/${id}`);
}