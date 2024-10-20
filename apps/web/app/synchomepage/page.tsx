"use client";
import { useRouter } from "next/navigation";

export default function SyncHomePage() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between w-full p-3 bg-indigo-600">
        <div className="text-white hover:cursor-pointer font-bold text-lg">
          SyncPath{" "}
        </div>
        <div className="text-white hover:cursor-pointer">{"Usename"}</div>
      </div>
    </div>
  );
}
