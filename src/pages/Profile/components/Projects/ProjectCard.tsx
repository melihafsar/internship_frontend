import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Edit, Pencil, Trash } from "lucide-react";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { ProjectFormTypes } from "@/schemas/project-form.schema";
import ProjectEditModal from "./ProjectEditModal";
import { useMemo, useState } from "react";
import { ImageUploadDialog } from "../../../../components/ImageUploadDialog";
import { Link } from "react-router-dom";
import { UserProject } from "@/types";

interface ProjectCardProps {
  project: UserProject;
}

const ImgMemo = ({ src }: { src: string }) => {
  const memoizedImg = useMemo(
    () => (
      <img
        src={src}
        alt="proje-thumbnail"
        className={`rounded-md object-cover bg-gray-100 ${
          src === "/no-image.svg" ? "w-[128px]" : "w-[256px]"
        }`}
      />
    ),
    [src]
  );
  return memoizedImg;
};

function ProjectCard({ project }: ProjectCardProps) {
  const { toast } = useToast();
  const { setLoading } = useUtil();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    project.project_thumbnail || "/no-image.svg"
  );

  const deleteProjectById = async (id: number) => {
    try {
      setLoading(true);
      await ProfileService.deleteProject(id);
      toast({
        title: "Proje başarıyla silindi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Proje silinirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateProject = async (data: ProjectFormTypes, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.updateProject(project.id!, {
        ...data,
      } as UserProject);
      toast({
        title: "Proje başarıyla güncellendi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Proje güncellenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleFileUpload = async (
    e: React.FormEvent<HTMLFormElement>,
    file: File
  ) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Lütfen bir resim dosyası seçin!",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await ProfileService.updateProjectField(
        project.id!,
        formData
      );
      setImageUrl(response.url);
      setShowUploadDialog(false);
      toast({
        title: "Resminiz başarıyla yüklendi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Resim yüklenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ImageUploadDialog
        show={showUploadDialog}
        dialogClose={() => setShowUploadDialog(false)}
        handleFileUpload={handleFileUpload}
      />
      <div
        key={project.id}
        className="flex flex-col md:flex-row my-4 flex-1 hover:border-primary border-l-4 p-4 gap-4 justify-between"
      >
        <div
          className="hover:opacity-60 flex items-center relative group cursor-pointer"
          onClick={() => setShowUploadDialog(true)}
        >
          <Pencil
            className={`absolute h-6 w-6 top-1/2  transform translate-x-[220%]  -translate-y-1/2 opacity-0 group-hover:opacity-100 z-50 ${
              imageUrl !== "/no-image.svg" && "translate-x-[500%]"
            }`}
          />
          <ImgMemo src={imageUrl} />
        </div>
        <div className="flex flex-col justify-start flex-1">
          <div className="flex w-full gap-2 justify-between items-center">
            <Link
              to={project.project_link || "#projects"}
              target="_blank"
              className="font-semibold hover:underline"
            >
              ■ {project.project_name}
            </Link>

            <div>
              <ProjectEditModal
                project={project}
                triggerButton={
                  <Button size="icon" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                }
                handleUpdateProject={handleUpdateProject}
              />
              <ConfirmationDialog
                onConfirm={() => deleteProjectById(project.id!)}
                triggerButton={
                  <Button size="icon" variant="ghost">
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                }
                headerTitle="Eklediğim Projemi Sil"
                description="Eklemiş olduğunuz projenizi silmek istediğinize emin misiniz?"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
