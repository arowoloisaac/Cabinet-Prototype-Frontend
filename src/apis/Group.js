import http from '@/utils/http'

export function ShowGroupApi(id){
    return http.get(`/api/group/list/${id}`);
}

export function AddGroupApi(group){
    return http.post('/api/group/add-group', group);
}

export function EditGroupApi(id, group){
    return http.put(`/api/group/${id}`, group);
}

export function DeleteGroupApi(id){
    return http.delete(`/api/group/${id}`);
}