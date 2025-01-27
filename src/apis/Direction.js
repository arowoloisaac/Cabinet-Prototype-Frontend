import http from '@/utils/http'

export function ShowDirectionApi(id){
    return http.get(`/api/direction/list/${id}`);
}

export function AddDirectionApi(direction){
    return http.post('/api/direction', direction);
}

export function EditDirectionApi(id, direction){
    return http.put(`/api/direction/${id}`, direction);
}

export function DeleteDirectionApi(id){
    return http.delete(`/api/direction/${id}`);
}

export function ShowDirectionByIdApi(id){
    return http.get(`/api/direction/${id}`);
}

export function ShowDirectionByGroupApi(id){
    return http.get(`/api/direction/group/${id}`);
}
