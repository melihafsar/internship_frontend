import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function CompanyPortfolio() {
  const location = useLocation();
  const companyId = location.pathname.split("/")[2];

  useEffect(() => {
    console.log(companyId);
  }, [companyId]);

  return <div>CompanyPortfolio / Detail</div>;
}

export default CompanyPortfolio;
