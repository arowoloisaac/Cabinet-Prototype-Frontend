import http from '@/utils/http'

export function AddScheduleAPI(schedule){
    return http.post('/api/schedule', schedule);
}

export function GetScheduleByCourseApi(id){
    return http.get(`/api/schedule/course/${id}`);
}