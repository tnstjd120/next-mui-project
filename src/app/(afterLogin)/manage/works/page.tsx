import { Suspense } from "react";
import { Test } from "./_components/Test";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
        <Test />
      </Suspense>
    </div>
  );
};

export default Page;
