import http from '@/utils/http'

export function ShowFacultyApi(){
    return http.get('/api/faculty');
}

export function AddFacultyApi(faculty){
    return http.post('/api/faculty', faculty);
}

export function ShowFacultyByIdApi(id){
    return http.get(`/api/faculty/${id}`);
}