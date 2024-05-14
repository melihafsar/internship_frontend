import { CompanyFormTypes } from "@/schemas/company-form.schema";
import { useToast } from "@/components/ui/use-toast";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { useEffect, useState } from "react";
import CompanyService from "@/services/company.service";
import { PagedListDto } from "@/types";
import { Button } from "@/components/ui/button";
import CreatePostingModal from "./CreatePostingModal";
import { Plus } from "lucide-react";
import CompanyPostingCard from "./CompanyPostingCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CompanyPostsProps {
  company: CompanyFormTypes;
}

function index({ company }: CompanyPostsProps) {
  const [loading, setLoading] = useState(false);
  const [postings, setPostings] =
    useState<PagedListDto<InternshipPostingFormTypes>>();
  const { toast } = useToast();

  const fetchPostings = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.listPostings(0, company?.id);
      setPostings(response.data);
    } catch {
      toast({
        title: "Hata",
        description: "Şirket staj ilanları getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!company?.id) return;
    fetchPostings();
  }, [company]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center w-full gap-2">
        <h4 className="font-semibold tracking-tight">
          Yayınladığım Staj İlanlarım{" "}
          <Badge className="ml-2 rounded-full">
            {(postings && postings?.total) || 0}
          </Badge>
        </h4>
        <CreatePostingModal
          triggerButton={
            <Button variant="secondary">
              <Plus className="w-4 h-4 mr-1" strokeWidth={3} /> Yeni Staj İlanı
              Yayınla
            </Button>
          }
        />
      </div>
      <Separator className="mt-1 mb-4" />
      {postings ? (
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row w-full gap-4 flex-wrap">
            {postings?.items.map((posting: InternshipPostingFormTypes) => (
              <CompanyPostingCard key={posting.id} posting={posting} />
            ))}
          </div>
        </div>
      ) : (
        <p className="font-semibold tracking-tight text-sm text-center">
          {loading ? "Yükleniyor..." : "Şirketiniz Henüz İlan Oluşturmamış."}
        </p>
      )}
    </div>
  );
}

export default index;
