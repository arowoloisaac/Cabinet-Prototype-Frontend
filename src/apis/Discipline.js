import http from '@/utils/http'

export function AddDiscipline(discipline){
    return http.post('/api/course', discipline);
}

export function StudentListDisciplineAPI(semester) {
    return http.get(`/api/course/student?semesterFilter=${encodeURIComponent(semester)}`);
}

export function TeacherListDisciplineAPI(){
    return http.get('/api/course/teacher');
}

export function AdminListDisciplineAPI(){
    return http.get('/api/course/admin');
}

export function GetDisciplineDetailApi(id){
    return http.get(`/api/course/${id}`);
}

export function ShowDisciplineByGroupApi(id){
    return http.get(`/api/course/group/${id}`);
}

export function ShowCourseTeacherListAPI(id){
    return http.get(`/api/course/teacherlist/${id}`);
}

export function AdminShowCourseByIdAPI(id){
    return http.get(`/api/course/${id}/admin`);
}

export function UpdateDisciplineAPI(id, discipline){
    return http.put(`/api/course/${id}`, discipline);
}

export function DeleteDisciplineAPI(id){
    return http.delete(`/api/course/${id}`);
}