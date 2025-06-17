"use client";
import { link } from "fs";
import { Title } from "./title";
import React from "react";

const rows = [
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
];

const columns = [
  {
    key: "date",
    label: "",
  },
  {
    key: "venue",
    label: "",
  },
  {
    key: "location",
    label: "",
  },

  {
    key: "info",
    label: "",
  },
  {
    key: "link",
    label: "",
  },
];

const dateConverter = (date: string) => {
  return date.split("•").reverse().join("-");
};

const sortedDates = rows.sort((a, b) => {
  return Date.parse(dateConverter(a.date)) - Date.parse(dateConverter(b.date));
});

const revertedSortedDates = rows.sort((a, b) => {
  return Date.parse(dateConverter(b.date)) - Date.parse(dateConverter(a.date));
});

const upcomingGigs = sortedDates.filter((row) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() - 1);
  const currentDate = Date.parse(tomorrow.toString());
  return Date.parse(dateConverter(row.date)) > currentDate;
});

const passedGigs = revertedSortedDates.filter((row) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() - 1);
  const currentDate = Date.parse(tomorrow.toString());
  return Date.parse(dateConverter(row.date)) < currentDate;
});

const reversedUpcomingGigs = upcomingGigs.reverse();

export default function Gigs() {
  return (
    <div>
      <div className="my-6 lg:mb-8 lg:mt-0">
        <Title subTitle="Gigs" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="flex justify-start sm:justify-center lg:text-xl 2xl:text-2xl font-bold ">
            <tr className="flex ">
              <td className="my-4">Upcoming</td>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                className="pt-8 text-xs text-white lg:text-xl 2xl:text-2xl"
                key={`${row.date}-${row.name}-${row.location}`}
              >
                <td className="hidden sm:block sm:text-center text-xs text-white lg:text-xl 2xl:text-2xl">
                  <span>{row.date}</span>
                </td>

                <td className="text-sm text-white sm:text-center lg:text-lg 2xl:text-2xl">
                  {row.info ? (
                    <>
                      <a
                        target="_blank"
                        href={row.info}
                        className="hover:text-bubblegum"
                      >
                        {row.name}
                        <div className="block sm:hidden text-left sm:text-right ">
                          {row.date}
                        </div>
                      </a>
                    </>
                  ) : (
                    <>
                      <span className="cursor-not-allowed">{row.name}</span>{" "}
                      <div className=" block sm:hidden sm:text-right">
                        {row.date}
                      </div>
                    </>
                  )}
                </td>
                <td className="text-md text-white lg:text-xl 2xl:text-2xl">
                  {row.location}
                </td>
                <td>
                  {row.link ? (
                    <>
                      <a target="_blank" href={row.link}>
                        <svg
                          version="1.1"
                          className="h-6 w-6 lg:w-8 lg:h-8"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512.002 512.002"
                        >
                          <circle
                            style={{ fill: "#4E598F" }}
                            cx="256.001"
                            cy="256"
                            r="256"
                          />
                          <path
                            style={{ fill: "#364270" }}
                            d="M511.596,241.7L391.019,121.085c-1.998,0.605-6.982-1.714-9.173-1.274
	c-51.717,8.62-101.71,0-151.704,13.791c-24.135,6.896-25.859,36.202-34.478,55.165c-12.067,34.478-10.343,72.404-25.859,105.158
	c-10.343,22.411-34.478,36.202-43.098,62.061c-2.875,10.785-2.705,24.379-5.956,34.69l120.98,120.922
	c4.725,0.26,9.48,0.403,14.269,0.403c141.384,0,256-114.616,256-256C512.001,251.201,511.858,246.434,511.596,241.7z"
                          />
                        </svg>
                      </a>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>

          <thead className="flex justify-start sm:justify-center lg:text-xl 2xl:text-2xl font-bold ">
            <tr className="flex ">
              <td className="my-4">Passed</td>
            </tr>
          </thead>

          <tbody>
            {passedGigs.map((row) => (
              <tr
                className="pt-8 text-xs text-white lg:text-xl 2xl:text-2xl"
                key={`${row.date}-${row.name}-${row.location}`}
              >
                <td className="hidden sm:block sm:text-center text-xs text-white lg:text-xl 2xl:text-2xl">
                  <span>{row.date}</span>
                </td>

                <td className="text-sm text-left sm:text-center text-white  lg:text-xl 2xl:text-2xl">
                  {row.info ? (
                    <>
                      <a
                        target="_blank"
                        href={row.info}
                        className="hover:text-bubblegum"
                      >
                        {row.name}
                        <div className="block sm:hidden sm:text-right ">
                          {row.date}
                        </div>
                      </a>
                    </>
                  ) : (
                    <>
                      <span className="cursor-not-allowed">{row.name}</span>{" "}
                      <div className=" block sm:hidden sm:text-right">
                        {row.date}
                      </div>
                    </>
                  )}
                </td>

                <td className="text-md text-white lg:text-xl 2xl:text-2xl">
                  {row.location}
                </td>
                <td>
                  {row.link ? (
                    <>
                      <a target="_blank" href={row.link}>
                        <svg
                          version="1.1"
                          className="h-6 w-6 lg:w-8 lg:h-8"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512.002 512.002"
                        >
                          <circle
                            style={{ fill: "#4E598F" }}
                            cx="256.001"
                            cy="256"
                            r="256"
                          />
                          <path
                            style={{ fill: "#364270" }}
                            d="M511.596,241.7L391.019,121.085c-1.998,0.605-6.982-1.714-9.173-1.274
	c-51.717,8.62-101.71,0-151.704,13.791c-24.135,6.896-25.859,36.202-34.478,55.165c-12.067,34.478-10.343,72.404-25.859,105.158
	c-10.343,22.411-34.478,36.202-43.098,62.061c-2.875,10.785-2.705,24.379-5.956,34.69l120.98,120.922
	c4.725,0.26,9.48,0.403,14.269,0.403c141.384,0,256-114.616,256-256C512.001,251.201,511.858,246.434,511.596,241.7z"
                          />
                        </svg>
                      </a>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
