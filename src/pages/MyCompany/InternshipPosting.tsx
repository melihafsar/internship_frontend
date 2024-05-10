import { useToast } from "@/components/ui/use-toast";
import { InternshipPostingFormTypes, useInternshipPostingForm } from "@/schemas/internship-posting.schema";
import { useEffect, useState } from "react";
import InternshipPostingForm from "./components/InternshipPostingForm";
import CompanyService from "@/services/company.service";
import { PagedListDto, ServiceReponse } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { showErrors } from "@/utils/helpers.utils";



export const InternshipPostingPage = () => {
  const { form } = useInternshipPostingForm();
  const [loading, setLoading] = useState(false);
  const [postings, setPostings] = useState<PagedListDto<InternshipPostingFormTypes>>();
  const { toast } = useToast();

  const handleFormSubmit = async (data: InternshipPostingFormTypes) => {
    try {
      setLoading(true);
      await CompanyService.createPosting(data);
      toast({
        title: "Başarılı",
        description: "Özel bilgiler başarıyla eklendi.",
        variant: "success",
      });
    } catch (error : any) {
      showErrors(form, error);
      toast({
        title: "Hata",
        description: "Özel bilgiler eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  const fetchPostings = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.listPostings(0);
      setPostings(response.data);
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
      });
    }
    setLoading(false);
  }

  const deletePosting = async (item: InternshipPostingFormTypes) => {
    setLoading(true);
    try {
      await CompanyService.endPosting(item);
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPostings();
  }, [])


  return <div>
    <h1>Staj İlanları</h1>
    <h2>{postings && `${postings?.from} - ${postings?.count}/${postings?.total}`}</h2>
    <div>
      {postings?.items.map((posting) => (
        <Card className="w-[300px] p-5">
          <CardHeader>
            <img src={posting.image_url}/>
            <CardTitle>{posting.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{posting.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => form.reset({...posting})}>Düzenle</Button>
            <Button onClick={() => deletePosting(posting)} variant={"destructive"}>Sonlandır</Button>
          </CardFooter>
        </Card>
      ))}
    </div>

    <InternshipPostingForm loading={loading} form={form} handleFormSubmit={handleFormSubmit} />
  </div>
};
export default InternshipPostingPage;