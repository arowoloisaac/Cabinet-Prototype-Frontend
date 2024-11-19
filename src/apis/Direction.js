import http from '@/utils/http'

export function ShowDirectionApi(id){
    return http.get(`/api/direction/list/${id}`);
}