import { CompanyFormTypes } from "@/schemas/company-form.schema";
import { Building2, ScrollText } from "lucide-react";
import CompanyDetail from "./CompanyDetail";
import CompanyPosts from "./CompanyPosts";
import { is } from "date-fns/locale";

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
      (isReadOnly?: boolean) => {
        return isReadOnly ? "" :
          "Şirket bilgilerini zi doğru bir şekilde doldurmanız sizi diğer kullanıcılarla buluşturmamız da yardımcı olacaktır. Şirketinizin görünürlüğünü arttıracaktır"
      },
    component: (company: CompanyFormTypes, isReadonly?: boolean) => (
      <CompanyDetail company={company} isReadonly={isReadonly} />
    ),
  },
  {
    id: "company-posts",
    title: "Şirket Staj İlanları",
    description: (isReadOnly?: boolean) => {
      return isReadOnly ? "" :
        "Yayınladığınız staj ilanları diğer kullanıcılar tarafından görüntülenecektir. İlanlarınızı güncel tutarak daha fazla stajyere ulaşabilirsiniz."
    },
    component: (company: CompanyFormTypes, isReadonly?: boolean) => (
      <CompanyPosts company={company} isReadonly={isReadonly} />
    ),
  },
];
