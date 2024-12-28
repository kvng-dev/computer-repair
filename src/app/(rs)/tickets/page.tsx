import { getTicketSearchResult } from "@/lib/queries/getTicketSearchResult";
import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTicket";
import TicketTable from "./TicketTable";

export const metadata = {
  title: "Ticket Search",
};

const Tickets = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">No open tickets found </p>
        )}
      </>
    );
  }

  const results = await getTicketSearchResult(searchText);
  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">No tickets found </p>
      )}
    </>
  );
};
export default Tickets;
