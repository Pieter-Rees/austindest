"use client";

import type { Gig } from "@/types";

import { Title } from "./ui/Title";

interface GigData
  extends Omit<
    Gig,
    "id" | "title" | "venue" | "time" | "ticketUrl" | "description"
  > {
  name: string;
  info?: string;
  link?: string;
}

const gigsData: readonly GigData[] = [
  {
    date: "06•04•2024",
    name: "30 Love",
    location: "Rotterdam",
  },
  {
    date: "25•05•2024",
    name: "Play Festival",
    location: "Leeuwarden",
  },
  {
    date: "13•04•2024",
    name: "The Deep Club",
    location: "Hoofddorp",
  },
  {
    date: "04•05•2024",
    name: "Charlatan",
    location: "Gent, BE",
  },
  {
    date: "29•06•2024",
    name: "SAM Ibiza Radio",
    location: "Waddinxveen",
  },
  {
    date: "13•07•2024",
    name: "Jaydee Invites",
    location: "Bergen (NH)",
  },
  {
    date: "31•08•2024",
    name: "Hartstocht Festival",
    location: "Elp",
  },
  {
    date: "07•09•2024",
    name: "Spees Festival",
    location: "Elp",
  },
  {
    date: "18•10•2024",
    name: "ADE (TBA)",
    location: "Amsterdam",
    info: "https://www.amsterdam-dance-event.nl/",
    link: "https://www.facebook.com/amsterdamdanceevent",
  },
] as const;

const dateConverter = (date: string): string => {
  return date.split("•").reverse().join("-");
};

const sortGigsByDate = (
  gigs: readonly GigData[],
  ascending = true
): readonly GigData[] => {
  return [...gigs].sort((a, b) => {
    const dateA = Date.parse(dateConverter(a.date));
    const dateB = Date.parse(dateConverter(b.date));
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

const filterGigsByDate = (
  gigs: readonly GigData[],
  upcoming = true
): readonly GigData[] => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const currentDate = Date.parse(yesterday.toString());

  return gigs.filter(gig => {
    const gigDate = Date.parse(dateConverter(gig.date));
    return upcoming ? gigDate > currentDate : gigDate < currentDate;
  });
};

const upcomingGigs = [
  ...filterGigsByDate(sortGigsByDate(gigsData), true),
].reverse();
const passedGigs = filterGigsByDate(sortGigsByDate(gigsData, false), false);

export default function Gigs() {
  return (
    <div className="space-y-8">
      <div className="flex items-center my-6 lg:my-0">
        <Title align="right" subtitle="Gigs" size="lg" />
      </div>
      <div className="w-full h-full">
        <div className="col-span-3 lg:col-span-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-6">
                Upcoming
              </h3>
              <div className="space-y-4">
                {upcomingGigs.map((gig: GigData, i: number) => (
                  <div
                    key={i.toString()}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/5 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="text-sm text-muted">{gig.date}</div>
                        <div className="text-base lg:text-lg font-medium text-foreground">
                          {gig.info ? (
                            <a
                              target="_blank"
                              href={gig.info}
                              className="hover:text-muted transition-colors duration-200"
                              rel="noreferrer"
                            >
                              {gig.name}
                            </a>
                          ) : (
                            <span className="text-muted">{gig.name}</span>
                          )}
                        </div>
                        <div className="text-sm text-muted">{gig.location}</div>
                      </div>
                    </div>
                    {gig.link && (
                      <a
                        target="_blank"
                        href={gig.link}
                        rel="noreferrer"
                        className="ml-4 text-muted hover:text-foreground transition-colors duration-200"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-6">
                Past Events
              </h3>
              <div className="space-y-4">
                {passedGigs.map((gig: GigData, i: number) => (
                  <div
                    key={i.toString()}
                    className="flex items-center justify-between p-4 border border-border rounded-lg opacity-75"
                  >
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="text-sm text-muted">{gig.date}</div>
                        <div className="text-base lg:text-lg font-medium text-foreground">
                          {gig.info ? (
                            <a
                              target="_blank"
                              href={gig.info}
                              className="hover:text-muted transition-colors duration-200"
                              rel="noreferrer"
                            >
                              {gig.name}
                            </a>
                          ) : (
                            <span className="text-muted">{gig.name}</span>
                          )}
                        </div>
                        <div className="text-sm text-muted">{gig.location}</div>
                      </div>
                    </div>
                    {gig.link && (
                      <a
                        target="_blank"
                        href={gig.link}
                        rel="noreferrer"
                        className="ml-4 text-muted hover:text-foreground transition-colors duration-200"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
