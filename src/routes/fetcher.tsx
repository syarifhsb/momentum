import useSWR from "swr";

import { HeadingOne } from "@/components/ui/typography";
import { Debug } from "@/components/ui/debug";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export function FetcherRoute() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <HeadingOne>Data Fetching</HeadingOne>

      <p className="text-center p-2 pt-0">
        A simple data fetching example to demonstrate the use of SWR hook.
      </p>

      <p className="text-center p-2 pt-0">
        Data fetched from{" "}
        <a
          href="https://amazingsafari-backend.haidar.dev/"
          target="_blank"
          className="text-blue-600 visited:text-purple-600"
        >
          https://amazingsafari-backend.haidar.dev
        </a>
      </p>

      <FetchItem />
    </div>
  );
}

function FetchItem() {
  const { data, error, isLoading } = useSWR(
    "https://amazingsafari-backend.haidar.dev/products",
    fetcher,
  );

  if (error) return <div>Failed to fetch data</div>;

  if (isLoading) return <div>Loading...</div>;

  return <Debug>{data}</Debug>;
}
