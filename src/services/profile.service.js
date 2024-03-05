import { api } from '../api';

export default {
    getUniversities() {
        return api.get('/University/List');
    },
    updateUserInfo(data) {
        return api.post('/Account/UpdateUserInfo', data);
    },
    getProfile() {
        return api.get('/Account/Get');
    }
}
