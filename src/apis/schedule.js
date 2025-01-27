import http from '@/utils/http'

export function AddScheduleAPI(schedule){
    return http.post('/api/schedule', schedule);
}

export function GetScheduleByCourseApi(id){
    return http.get(`/api/schedule/course/${id}`);
}

export function GetScheduleByIdApi(id){
    return http.get(`/api/schedule/${id}`);
}

export function EditScheduleAPI(schedule){
    return http.put('/api/schedule', schedule);
}

export function DeleteScheduleApi(id){
    return http.delete(`/api/schedule/${id}`);
}
