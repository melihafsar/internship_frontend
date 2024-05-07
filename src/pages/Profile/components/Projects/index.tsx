import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { UserDetail } from "@/types";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import ProfileService from "@/services/profile.service";
import {
  ProjectFormTypes,
  useProjectForm,
} from "@/schemas/project-form.schema";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import { showAccordionInProfile } from "@/utils/helpers.utils";

interface ProjectsProps {
  user: UserDetail;
}

function Projects({ user }: ProjectsProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (data: ProjectFormTypes, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.createProject(data);
      toast({
        title: "Başarılı",
        description: "Yeni proje başarıyla eklendi.",
        variant: "success",
      });
      setShowForm(false);
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Hata",
        description: "Proje eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center w-full my-2">
        <h5 className="text-md font-medium my-2">
          Eklediğim Projelerim
          <Badge className="ml-2" variant="secondary">
            {user.projects?.length}
          </Badge>
        </h5>
        <Button
          onClick={() =>
            showAccordionInProfile(showForm, formDivRef, setShowForm)
          }
          variant="outline"
          className="flex items-center space-x-2 mb-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Proje Ekleyin
        </Button>
      </div>
      {user.projects?.length > 0 && (
        <>
          <Separator className="my-1" />
          {user.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </>
      )}
      <Accordion
        type="single"
        collapsible
        value={showForm ? "project" : undefined}
      >
        <AccordionItem value="project" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <ProjectForm
              form={useProjectForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default Projects;
