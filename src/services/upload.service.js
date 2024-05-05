import { api } from '../api';
export default {
    uploadImage(imageData) {
        return api.post('/App/UploadImage', imageData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};