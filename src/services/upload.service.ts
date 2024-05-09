import { api } from "../api";
export default {
  uploadImage(imageData: FormData) : Promise<{ url: string }>{
    return api.post("/App/UploadImage", imageData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
