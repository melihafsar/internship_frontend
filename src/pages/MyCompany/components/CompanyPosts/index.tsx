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
import InfiniteLoader from "@/components/InfiniteLoader";

interface CompanyPostsProps {
  company: CompanyFormTypes;
  isReadonly?: boolean;
}

function index({ company, isReadonly }: CompanyPostsProps) {
  const [loading, setLoading] = useState(false);
  const [postings, setPostings] =
    useState<PagedListDto<InternshipPostingFormTypes>>();
  const { toast } = useToast();
  const [hasError, setHasError] = useState(false);
  const [pagination, setPagination] = useState({
    from: 0,
    take: 10,
    total: 0,
  });

  const fetchPostings = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.listPostings(
        pagination.from,
        company?.id,
        pagination.take,
        "CreatedAt"
      );
      setPostings((prev) => ({
        ...response.data,
        items: prev
          ? [...prev.items, ...response.data.items]
          : response.data.items,
      }));
      setPagination({
        ...pagination,
        from: pagination.from + pagination.take,
        total: response.data.total,
      });
    } catch {
      setHasError(true);
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
          {!isReadonly ? "Yayınladığım Staj İlanlarım " : "Şirketin Staj İlanları "}
          <Badge className="ml-2 rounded-full">
            {(postings && postings?.total) || 0}
          </Badge>
        </h4>
        {!isReadonly && <CreatePostingModal
          triggerButton={
            <Button variant="secondary">
              <Plus className="w-4 h-4 mr-1" strokeWidth={3} /> Yeni Staj İlanı
              Yayınla
            </Button>
          }
        />}
      </div>
      <Separator className="mt-1 mb-4" />
      {postings ? (
        <div className="flex flex-col">
          <InfiniteLoader
            loadMore={fetchPostings}
            from={pagination.from}
            totalElements={pagination.total}
            loading={loading}
            hasError={hasError}
            className="flex flex-col md:flex-row w-full gap-4 flex-wrap"
          >
            {postings?.items.map((posting: InternshipPostingFormTypes) => (
              <CompanyPostingCard key={posting.id} posting={posting} isReadonly={isReadonly} />
            ))}
          </InfiniteLoader>
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
