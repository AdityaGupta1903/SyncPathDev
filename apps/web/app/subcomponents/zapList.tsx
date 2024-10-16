"use client"
import { useQuery } from "@tanstack/react-query";
const ZapList = ()=>{
    const { data: AvailableTriggerData, isLoading } = useQuery({
        queryKey: ["getAvailabletrigger"],
        queryFn: getAvailabletriggers,
      });
    return <div>
        Zap List
    </div>
}

export default ZapList;