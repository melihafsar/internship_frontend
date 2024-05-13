import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EducationFormTypes, useEducationForm } from "@/schemas/education-form.schema";
import { WorkFormTypes, useWorkForm } from "@/schemas/work-form.schema";
import EducationForm from "../Education/EducationForm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import index from "@/pages/UserRegister";
import WorkForm from "../WorkExperience/WorkForm";
import { cn } from "@/lib/utils";
import ProfileService from "@/services/profile.service";
import moment from "moment";
import { useToast } from "@/components/ui/use-toast";

interface ImportLinkedinDialogProps {
    show: boolean;
    dialogClose: () => void;
    data?: {
        educations: EducationFormTypes[],
        work_history: WorkFormTypes[]
    },
    setData: (data: { educations: EducationFormTypes[], work_history: WorkFormTypes[] }) => void;
}

export const ImportLinkedinDialog = (props: ImportLinkedinDialogProps) => {
    const {
        show,
        dialogClose,
        data,
        setData,
    } = props;

    const [loading, setLoading] = useState(false);
    const educationFormHandle = useEducationForm();
    const workFormHandle = useWorkForm();
    const [order, setOrder] = useState<{ type: "education" | "work", index: number }>({ type: "education", index: 0 });
    const { toast } = useToast();

    const increaseIndex = () => {
        save();
        if (order.type === "education") {
            if (order.index + 1 < data!.educations.length) {
                setOrder({ type: "education", index: order.index + 1 });
                educationFormHandle.form.reset(data!.educations[order.index + 1]);
            }
            else {
                setOrder({ type: "work", index: 0 });
                workFormHandle.form.reset(data!.work_history[0]);
            }
        }
        else {
            if (order.index + 1 < data!.work_history.length) {
                setOrder({ type: "work", index: order.index + 1 });
                workFormHandle.form.reset(data!.work_history[order.index + 1]);
            }
        }
    }

    const decreaseIndex = () => {
        save()

        if (order.type === "education") {
            if (order.index - 1 >= 0) {
                setOrder({ type: "education", index: order.index - 1 });
                educationFormHandle.form.reset(data!.educations[order.index - 1]);
            }
        }
        else {
            if (order.index - 1 >= 0) {
                setOrder({ type: "work", index: order.index - 1 });
                workFormHandle.form.reset(data!.work_history[order.index - 1]);
            }
            else {
                setOrder({ type: "education", index: data!.educations.length - 1 });
                educationFormHandle.form.reset(data!.educations[data!.educations.length - 1]);
            }
        }
    }

    const save = () => {
        if (order.type === "education") {
            data!.educations[order.index] = educationFormHandle.form.getValues();
        }
        else {
            data!.work_history[order.index] = workFormHandle.form.getValues();
        }
    }

    useEffect(() => {
        if (show && data?.educations && data?.educations.length > 0) {
            educationFormHandle.form.reset(data!.educations[order.index]);
        }

    }, [data, show])

    const onFormSubmit = async (e: EducationFormTypes | WorkFormTypes) => {
        setLoading(true);
        try {
            if (order.type === "education") {
                const formValues = e as EducationFormTypes
                const dto = {
                    ...formValues,
                    faculty: formValues.faculty,
                    department: formValues.department,
                    is_graduated: formValues.is_graduated,
                    start_date: moment(formValues.start_date).local().format("YYYY-MM-DD"),
                    end_date: formValues.is_graduated
                        ? moment(formValues.end_date).local().format("YYYY-MM-DD")
                        : null,
                    education_year: formValues.is_graduated ? null : formValues.education_year,
                    gpa: formValues.gpa,
                    description: formValues.description,
                } as any;

                delete dto.university_available;
                delete dto.university_id;

                await ProfileService.addNewEducation(dto);
                
                data?.educations.splice(order.index, 1);    
                toast({
                    title: "Başarılı",
                    description: "Veri başarıyla eklendi.",
                    variant: "success",
                });

            }
            else {
                const formValues = e as WorkFormTypes;
                await ProfileService.addNewExperience({
                    ...formValues,
                    start_date: moment(formValues.start_date).format("YYYY-MM-DD"),
                    end_date: formValues.is_working_now
                        ? undefined
                        : moment(formValues.end_date).format("YYYY-MM-DD"),
                    reason_for_leave: formValues.is_working_now
                        ? undefined
                        : formValues.reason_for_leave,
                });
                toast({
                    title: "Başarılı",
                    description: "Veri başarıyla eklendi.",
                    variant: "success",
                });
            }
        }
        catch (error: any) {
            console.log(error);
            toast({
                title: "Hata",
                description: "Veri eklenirken bir hata oluştu.",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }



    };

    return (
        <Dialog open={show} onOpenChange={dialogClose} modal={true}>
            <DialogContent>
                <div className="h-full w-full">
                    <DialogHeader>
                        <DialogTitle>Linkedini Bağla</DialogTitle>
                        <DialogDescription>{order.type == "education" ? "Eğitimler" : "İş Deneyimleri"} {(order.index + 1) + " / " + (order.type == "education" ? data?.educations.length : data?.work_history.length)}</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-between mt-5">
                        <Button type="button" className={cn("w-1/6 self-end p-1", (order.type == "education" && order.index == 0) ? "invisible" : "")} onClick={decreaseIndex}>
                            <ChevronLeft />
                            Önceki
                        </Button>
                        <Button type="button" className={cn("w-1/6 self-end p-1", (order.type == "work" && data?.work_history && order.index == data?.work_history.length - 1) ? "invisible" : "")} onClick={increaseIndex}>
                            Sonraki
                            <ChevronRight />
                        </Button>

                    </div>
                    <div className="h-full overflow-y-auto w-full">
                        {order.type === "education" &&
                            <EducationForm
                                form={educationFormHandle.form}
                                loading={loading}
                                handleFormSubmit={onFormSubmit}
                            />}
                        {order.type === "work" &&
                            <WorkForm
                                form={workFormHandle.form}
                                loading={loading}
                                handleFormSubmit={onFormSubmit}
                            />}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
