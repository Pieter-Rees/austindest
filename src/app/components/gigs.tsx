"use client";
import { Title } from "./title";
import React from "react";

const rows = [
  {
    key: "1",
    date: "10|08|2023",
    name: "Bodhi beach | zandvoort",
    info: "i",
    link: "F",
  },
  {
    key: "2",
    date: "08-09|09|2023",
    name: "Hartstocht festival | ELP",
    info: "i",
    link: "F",
  },
  {
    key: "3",
    date: "16|09|2023",
    name: "Jaydee invites | Bergen",
    info: "i",
    link: "F",
  },
  {
    key: "4",
    date: "20|10|2023",
    name: "DIJKBREUK (ADE) | Amsterdam",
    info: "i",
    link: "F",
  },
  {
    key: "5",
    date: "21|10|2023",
    name: "Cinematique (ADE)| A'DAM",
    info: "i",
    link: "F",
  },
  {
    key: "6",
    date: "18|11|2023",
    name: "Charlatan | Gent, BE",
    info: "i",
    link: "F",
  },
];

const columns = [
  {
    key: "date",
    label: "",
  },
  {
    key: "name",
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

export default function Gigs() {
  return (
    <div id="gigs" className="w-full h-full lg:grid grid-cols-2 gap-4">
      <div className="flex items-center mb-4 lg:mb-0">
        <Title left={true} subTitle="Gigs" />
      </div>

      <div>
        <table className="w-full table-auto">
          <tbody>
            {rows.map((row, i) => {
              // Return the element. Also pass key
              return (
                <tr key={row.key}>
                  <td>{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.info}</td>
                  <td>{row.link}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
