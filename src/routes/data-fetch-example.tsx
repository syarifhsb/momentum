import useSWR from "swr";

import { HeadingOne } from "@/components/ui/typography";
import { Debug } from "@/components/ui/debug";

function FetchItem() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://amazingsafari-backend.haidar.dev/",
    fetcher
  );

  if (error) return <div>Failed to fetch data</div>;

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return <Debug>{data}</Debug>;
}

export function DataFetchExample() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <HeadingOne>Data Fetching</HeadingOne>
      <p className="text-center p-2 pt-0">
        A simple data fetching example to demonstrate the use of SWR hook.
      </p>
      <p className="text-center p-2 pt-0">
        Data fetched from https://amazingsafari-backend.haidar.dev/
      </p>
      <FetchItem />
    </div>
  );
}
