import { api } from '../api';

export default {
    isRegistered: () => {
        return api.post('/Account/IsUserRegistered');
    }
}
