import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { asc, eq, ilike, or, sql } from "drizzle-orm";

export async function getTicketSearchResult(searchText: string) {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.created_at,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}`),
        ilike(tickets.tech, `%${searchText}`),
        ilike(customers.city, `%${searchText}`),
        ilike(customers.zip, `%${searchText}`),
        ilike(customers.email, `%${searchText}`),
        ilike(customers.phone, `%${searchText}`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    )
    .orderBy(asc(tickets.created_at));

  return results;
}

export type TickectsSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResult>
>;
