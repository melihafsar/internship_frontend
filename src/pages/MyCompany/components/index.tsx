import { CompanyFormTypes } from "@/schemas/company-form.schema";
import { Building2, ScrollText } from "lucide-react";
import CompanyDetail from "./CompanyDetail";
import CompanyPosts from "./CompanyPosts";

export const navigationItems = [
  {
    id: "company-detail-nav",
    label: "Şirket Detayları",
    href: "#company-detail",
    icon: <Building2 />,
  },
  {
    id: "company-posts-nav",
    label: "Staj İlanları",
    href: "#company-posts",
    icon: <ScrollText />,
  },
];

export const companyInfoFields = [
  {
    id: "company-detail",
    title: "Şirket Detayları",
    description:
      "Şirket bilgilerinizi doğru bir şekilde doldurmanız sizi diğer kullanıcılarla buluşturmamız da yardımcı olacaktır. Şirketinizin görünürlüğünü arttıracaktır",
    component: (company: CompanyFormTypes) => (
      <CompanyDetail company={company} />
    ),
  },
  {
    id: "company-posts",
    title: "Şirket Staj İlanları",
    description:
      "Yayınladığınız staj ilanları diğer kullanıcılar tarafından görüntülenecektir. İlanlarınızı güncel tutarak daha fazla stajyere ulaşabilirsiniz.",
    component: (company: CompanyFormTypes) => (
      <CompanyPosts company={company} />
    ),
  },
];
