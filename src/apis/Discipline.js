import http from '@/utils/http'

export function AddDiscipline(discipline){
    return http.post('/api/course', discipline);
}

