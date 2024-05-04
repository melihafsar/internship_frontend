import { api } from '../api';

export default {
    getUserInfo() {
        return api.post("/Account/GetInfo");
    },
    getUniversities() {
        return api.get('/University/List');
    },
    updateUserInfo({ name, surname, phone_number }) {
        return api.post('/Account/UpdateUserInfo', { name, surname, phone_number });
    },
    getProfile() {
        return api.get('/Account/Get');
    },
    updateProfileImage(imageData) {
        return api.post('/Account/UpdateProfileImage', imageData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    addNewEducation(newEducationDate) {
        return api.post('/UniversityEducation/Create', newEducationDate);
    },
    deleteEducation(educationId) {
        return api.post(`/UniversityEducation/Delete/${educationId}`);
    },
    updateEducation(educationId, educationData) {
        return api.post(`/UniversityEducation/Update/${educationId}`, educationData);
    },
    addNewForeignLanguage(newLanguageData) {
        return api.post('/ForeignLanguage/Create', newLanguageData);
    },
    deleteForeignLanguage(languageId) {
        return api.post(`/ForeignLanguage/Delete/${languageId}`);
    },
    updateForeignLanguage(languageId, languageData) {
        return api.post(`/ForeignLanguage/Update/${languageId}`, languageData);
    },
    addNewExperience(newExperienceData) {
        return api.post('/WorkHistory/Create', newExperienceData);
    },
    deleteExperience(experienceId) {
        return api.post(`/WorkHistory/Delete/${experienceId}`);
    },
    updateExperience(experienceId, experienceData) {
        return api.post(`/WorkHistory/Update/${experienceId}`, experienceData);
    },
};