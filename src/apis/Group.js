import http from '@/utils/http'

export function ShowGroupApi(id){
    return http.get(`/api/group/list/${id}`);
}