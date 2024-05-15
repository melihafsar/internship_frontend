import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
interface PostingAsideProps {
  userType: number | null;
}

function PostingAside({ usertype }: PostingAsideProps) {
  return (
    <div className="flex flex-col justify-center align-center min-h-[500px] border-4 border-secondary rounded-md">
      <Drawer>
        <DrawerTrigger>
          <Button>Show Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <h2>hello</h2>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default PostingAside;

// "number_of_comments": 0,
// "average_points": 0
