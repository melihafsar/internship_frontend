import { useToast } from "@/components/ui/use-toast";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { PagedListDto } from "@/types";
import { useEffect, useState } from "react";
import CompanyService from "@/services/company.service";
import SearchBar, { PostingFilters } from "./SearchBar";
import MostPreferredPost from "./MostPreferredPost";
import PostingCard from "@/components/PostingCard";
import InfiniteLoader from "@/components/InfiniteLoader";
import { Skeleton } from "@/components/ui/skeleton";

function HomePage() {
  const [postings, setPostings] =
    useState<PagedListDto<InternshipPostingFormTypes>>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pagination, setPagination] = useState({
    from: 0,
    take: 10,
    total: 0,
  });

  const [filters, setFilters] = useState<PostingFilters>({});

  const filtersChanged = (value: PostingFilters) => {
    setPagination({
      ...pagination,
      from: 0,
    });
    setPostings(undefined);
    setFilters(value);
  };

  useEffect(() => {
    fetchPostings(false);
  }, [filters]);

  const fetchPostings = async (usePrevData: boolean = true) => {
    setLoading(true);
    try {
      const response = await CompanyService.listPostings(
        pagination.from,
        undefined,
        pagination.take,
        "CreatedAt",
        filters.matchQuery,
        filters.workType,
        filters.employmentType,
        filters.hasSalary,
      );
      setPostings((prev) => ({
        ...response.data,
        items: prev && usePrevData
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
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostings();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col justify-center items-center bg-secondary w-full h-64">
        <h1 className="text-2xl md:text-4xl text-center text-primary font-bold italic my-8">
          Staj Programları
        </h1>
        <SearchBar filters={filters} setFilters={filtersChanged}/>
      </div>
      <div className="flex justify-center w-full my-16">
        <MostPreferredPost />
      </div>

      {postings === undefined && loading ? (
        <div className="flex flex-col justify-center items-center w-[90%] md:flex-row gap-4 flex-wrap mb-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className="flex flex-col flex-1 min-w-[270px] max-w-[90%] md:max-w-[300px] h-[508px] justify-between items-center gap-2 p-1"
              key={index}
            >
              <Skeleton className="h-4/5 w-full" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        postings && (
          <InfiniteLoader
            loadMore={fetchPostings}
            from={pagination.from}
            totalElements={pagination.total}
            loading={loading}
            hasError={hasError}
            className="flex flex-col justify-center items-center w-[90%] md:flex-row gap-4 flex-wrap mb-8"
          >
            {postings?.items.map(
              (posting: InternshipPostingFormTypes, index) => (
                <PostingCard key={`${posting.id}-${index}`} posting={posting} />
              )
            )}
          </InfiniteLoader>
        )
      )}
    </div>
  );
}

export default HomePage;
