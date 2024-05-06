import {
  BookOpenText,
  FlaskConical,
  FolderKey,
  Languages,
  LayoutTemplate,
  Presentation,
  User,
  Waypoints,
} from "lucide-react";

import ContactDetails from "./ContactDetails";
import PrivateInformation from "./PrivateInformation";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Skills from "./Skils";
import Projects from "./Projects";
import References from "./References";
import ForeignLanguages from "./ForeignLanguages";

export const navigationItems = [
  {
    id: "contact-nav",
    label: "İletişim Bilgileri",
    href: "#contact",
    icon: <User />,
  },
  {
    id: "experience-nav",
    label: "İş Deneyimleri",
    href: "#experience",
    icon: <FlaskConical />,
  },
  {
    id: "education-nav",
    label: "Eğitim Bilgileri",
    href: "#education",
    icon: <BookOpenText />,
  },
  {
    id: "private-nav",
    label: "Özel Bilgiler",
    href: "#private",
    icon: <FolderKey />,
  },
  {
    id: "skills-nav",
    label: "Yetenekler",
    href: "#skills",
    icon: <LayoutTemplate />,
  },
  {
    id: "languages-nav",
    label: "Yabancı Diller",
    href: "#languages",
    icon: <Languages />,
  },
  {
    id: "projects-nav",
    label: "Projeler",
    href: "#projects",
    icon: <Presentation />,
  },
  {
    id: "references-nav",
    label: "Referanslar",
    href: "#references",
    icon: <Waypoints />,
  },
];

export const userInfoFields = [
  {
    id: "contact",
    title: "İletişim Bilgileri",
    description:
      "İletişim bilgilerinizi doğru bir şekilde doldurmanız sizi diğer kullanıcılarla buluşturmamız da yardımcı olacaktır.",
    component: <ContactDetails />,
  },
  {
    id: "experience",
    title: "İş Deneyimleri",
    description:
      "İş deneyimlerinizi paylaşarak daha fazla iş fırsatı yakalayın.",
    component: <WorkExperience />,
  },
  {
    id: "education",
    title: "Eğitim Bilgileri",
    description:
      "Eğitim bilgilerinizi paylaşmanız sizi diğer adaylardan öne çıkarır.",
    component: <Education />,
  },
  {
    id: "private",
    title: "Özel Bilgiler",
    description:
      "Firmaların sizi daha iyi tanımasına yardımcı olacak bilgilerinizi doldurarak daha fazla iş fırsatı yakalayın.",
    component: <PrivateInformation />,
  },
  {
    id: "skills",
    title: "Yetenekler",
    description:
      "Yeteneklerinizden bahsederek daha farklı alanlarda iş fırsatları yakalayabilirsiniz.",
    component: <Skills />,
  },
  {
    id: "languages",
    title: "Yabancı Diller",
    description:
      "Öğrendiğiniz yabancı dilleri yazarak yaşadığınız ülkeye göre farklı dillerde iş fırsatları yakalayabilirsiniz.",
    component: <ForeignLanguages />,
  },
  {
    id: "projects",
    title: "Projeler",
    description:
      "Yaptığınız projeleri paylaşarak firmaların sizi daha eşsiz bulmasını sağlayın.",
    component: <Projects />,
  },
  {
    id: "references",
    title: "Referanslar",
    description:
      "Referanslarınız ile firmaların sizi daha iyi tanımasını sağlayın.",
    component: <References />,
  },
];
