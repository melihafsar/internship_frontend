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

// const [isFollowingCompany, setIsFollowingCompany] = useState(
//   posting?.company?.is_current_user_following || false
// ); //TODO: bu kısımdaki state posting üstünden çekilmeyecek.

// const handleFollowCompanyClick = async () => {
//   try {
//     await internshipService.followCompany(
//       posting.company?.company_id,
//       !isFollowingCompany
//     );
//     setIsFollowingCompany(!isFollowingCompany);
//   } catch (error) {
//     toast({
//       title: "Hata",
//       description: "Şirket takip edilirken bir hata oluştu.",
//       variant: "destructive",
//     });
//   }
// };

{
  /* //Todo: Yorum satırına alınan alanlar Şirket detail sayfasında olacak.  */
}
{
  /* <Button
              variant="default"
              className="flex font-semibold rounded-md w-52 gap-2 justify-center m-0 md:mr-16"
              size="sm"
              onClick={handleFollowCompanyClick}
              disabled={!(userType === 0)}
            >
              <BellRing
                fill={isFollowingCompany ? "currentColor" : "none"}
                size={16}
              />
              Şirket{isFollowingCompany ? " Takip Ediliyor" : "i Takip Et"}
            </Button> */
}
