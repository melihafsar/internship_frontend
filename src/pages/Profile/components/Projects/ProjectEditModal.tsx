import React from "react";
import { UserProject } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUtil } from "@/context/UtilContext";
import {
  ProjectFormTypes,
  useProjectForm,
} from "@/schemas/project-form.schema";
import ProjectForm from "./ProjectForm";

interface ProjectEditModalProps {
  triggerButton: React.ReactNode;
  handleUpdateProject: (data: ProjectFormTypes, e: any) => Promise<void>;
  project: UserProject;
}

function ProjectEditModal({
  triggerButton,
  handleUpdateProject,
  project,
}: ProjectEditModalProps) {
  const { loading } = useUtil();
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>İş Deneyimini Düzenle</DialogTitle>
          <DialogDescription>
            İş deneyiminizi düzenleyebilir ve güncelleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto w-full">
          <ProjectForm
            form={useProjectForm().form}
            loading={loading}
            handleFormSubmit={handleUpdateProject}
            initialValues={project}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectEditModal;
