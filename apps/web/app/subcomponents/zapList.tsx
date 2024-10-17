"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getZaps } from "../api/function";

const ZapList: React.FC<{ email: string }> = ({ email }) => {
  const {
    data: UserZaps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getUserZaps"],
    queryFn: () => getZaps(email),
  });
  console.log(UserZaps);

  return <div>Zap List</div>;
};

export default ZapList;
