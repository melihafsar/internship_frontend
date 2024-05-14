import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { companyInfoFields } from "./index";
import { CompanyFormTypes } from "@/schemas/company-form.schema";

interface CompanyInfoFieldsProps {
  company?: CompanyFormTypes;
}

function CompanyInfoFields({ company }: CompanyInfoFieldsProps) {
  return (
    <>
      {companyInfoFields.map((field: any) => (
        <div id={field.id} key={field.id} className="mb-8">
          <Card className="border-2 hover:ease-in hover:duration-500 hover:border-orange-500 ">
            <CardHeader className="bg-primary-foreground rounded-t-md mb-4">
              <CardTitle className="text-lg">{field.title}</CardTitle>
              <CardDescription>{field.description}</CardDescription>
            </CardHeader>
            <CardContent>{field.component(company)}</CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}

export default CompanyInfoFields;
