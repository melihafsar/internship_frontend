import ApplicationsList from "./ApplicationsList";
import InternshipsForYou from "./InternshipsForYou";

function Applications() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full h-full gap-4">
      <ApplicationsList />
      <InternshipsForYou />
    </div>
  );
}
export default Applications;
