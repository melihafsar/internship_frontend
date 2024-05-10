import { api } from "../api";
export default {
  uploadImage(imageData: File, image_type: "Image" | "Background") : Promise<{ url: string, file_name: string }>{
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("type", image_type);
    return api.post("/App/UploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadCv(imageData: File) : Promise<{ url: string, file_name: string }>{
    const formData = new FormData();
    formData.append("file", imageData);
    return api.post("/App/UploadCv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
