import http from '@/utils/http'

export function ShowFacultyApi(){
    return http.get('/api/faculty');
}
