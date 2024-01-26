"use client";

import Breadcrumb from "@/app/_components/Breadcrumb";
import PageContainer from "@/app/_components/container/PageContainer";
import ProductTableList from "./_components/CustomTable";
import BlankCard from "./_components/BlankCard";

const BCrumb = [
  {
    title: "Manage",
  },
  {
    title: "사용자 관리",
  },
];

const Page = () => {
  return (
    <PageContainer title="사용자 관리">
      <Breadcrumb title="사용자 관리" items={BCrumb} />

      <BlankCard>
        <ProductTableList />
      </BlankCard>
    </PageContainer>
  );
};

export default Page;
