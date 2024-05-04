import { UserProject } from "@/types";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { ProjectFormTypes } from "@/schemas/project-form.schema";
import ProjectEditModal from "./ProjectEditModal";

interface ProjectCardProps {
  project: UserProject;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { toast } = useToast();
  const { setLoading } = useUtil();

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
      await ProfileService.updateProject(project.id, data);
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

  return (
    <div
      key={project.id}
      className="flex flex-col my-8 hover:border-primary border-l-4 p-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center space-x-2">
        <p className="font-semibold"> ■ {project.project_name}</p>
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
            onConfirm={() => deleteProjectById(project.id)}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            }
            headerTitle="Eklediğim Projemi Sil"
            description="Eklemiş olduğunuz projenizi silmek istediğinize emin misiniz?"
          />
        </div>
        <div>
          {
            //thumbnail image
            //description
            //project url
          }
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
