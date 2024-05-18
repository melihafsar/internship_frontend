import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostingDetailTab from "./PostingDetailTab/PostingDetailTab";
import AssessmentsTabs from "./AssessmentsTabs";
import { Badge } from "@/components/ui/badge";
import PostingAside from "./PostingAside/PostingAside";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import ApplicationsUserTab from "./ApplicationsUserTab";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CompanyTabsComponentProps {
  posting: InternshipPostingFormTypes;
  userType: number | null;
}

function CompanyTabsComponent({
  posting,
  userType,
}: CompanyTabsComponentProps) {
  const [currentTab, setCurrentTab] = useState<string>();
  return (
    <div className="flex flex-col w-full rounded-none">
      <Tabs
        defaultValue="posting-detail"
        className="w-full"
        onValueChange={(value) => setCurrentTab(value)}
      >
        <TabsList className="flex flex-row justify-center  md:justify-start w-full rounded-t-none h-full px-2 md:pl-16">
          <TabsTrigger className="w-1/2 md:w-[150px]" value="posting-detail">
            İlan Detayları
          </TabsTrigger>
          <TabsTrigger value="assessments" className="w-1/2 md:w-[180px]">
            Değerlendirmeler
            <Badge variant="default" className="ml-2 text-[10px] px-1.5 py-0.1">
              {posting?.number_of_comments || 0}
            </Badge>
          </TabsTrigger>
          {userType === 1 && (
            <TabsTrigger className="w-1/2 md:w-[180px]" value="applications">
              Başvuranlar
              <Badge
                variant="default"
                className="ml-2 text-[10px] px-1.5 py-0.1"
              >
                {posting?.number_of_applications || 0}
              </Badge>
            </TabsTrigger>
          )}
        </TabsList>
        <div className="flex flex-col md:flex-row w-full gap-8 p-5 min-h-[500px]">
          <TabsContent value="posting-detail" className="m-0 w-full md:w-2/3">
            <PostingDetailTab posting={posting} userType={userType} />
          </TabsContent>
          <TabsContent value="assessments" className="m-0 w-full md:w-2/3">
            <AssessmentsTabs />
          </TabsContent>
          <TabsContent
            value="applications"
            className={cn("m-0 w-full", userType === 0 && "md:w-2/3")}
          >
            <ApplicationsUserTab />
          </TabsContent>
          {currentTab !== "applications" && (
            <div className="w-full md:flex-1">
              <PostingAside userType={userType} postingId={posting.id} />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default CompanyTabsComponent;
