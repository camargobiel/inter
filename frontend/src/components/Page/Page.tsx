import React from "react";

type PageProps = {
  children: React.ReactNode
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="p-5">
      {children}
    </div>
  );
}

export default Page;