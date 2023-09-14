"use client";
import { Title } from "./title";
import React from "react";

const rows = [
  {
    key: "1",
    date: "08-09 Sept 2023",
    name: "Hartstocht festival",
    location: "Elp",
    info: "i",
    link: "F",
  },
  {
    key: "2",
    date: "16 SEPT 2023",
    name: "Jaydee invites",
    location: "Bergen",
    info: "i",
    link: "F",
  },
  {
    key: "3",
    date: "20 OKT2023",
    name: "Dijkbreuk (ADE)",
    location: "Amsterdam",
    info: "i",
    link: "F",
  },
  {
    key: "4",
    date: "21 OKT 2023",
    name: "Cinematique (ADE)",
    location: "Amsterdam",
    info: "i",
    link: "F",
  },
  {
    key: "5",
    date: "18 NOV 2023",
    name: "Charlatan",
    location: "Gent, BE",
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

export default function Gigs() {
  return (
    <div id="gigs" className="w-full h-full lg:grid grid-cols-3 gap-8">
      <div className="flex items-center mb-4 lg:mb-0">
        <Title left={true} subTitle="Gigs" />
      </div>

      <div className="col-span-2 lg:col-span-auto">
        <table className="w-full border-separate border-spacing-4 table-auto">
          <tbody>
            {rows.map((row, i) => {
              // Return the element. Also pass key
              return (
                <tr
                  className="pt-8 text-lg lg:text-lg 2xl:text-xl"
                  key={row.key}
                >
                  <td className="text-lg 2xl:text-2xl">{row.date}</td>
                  <td className="text-lg 2xl:text-2xl">
                    {row.info ? (
                      <>
                        <a target="_blank" href={row.info}>
                          {row.name}
                        </a>
                      </>
                    ) : (
                      <>{row.name}</>
                    )}
                  </td>
                  <td>{row.location}</td>
                  <td>
                    {row.link ? (
                      <>
                        <a target="_blank" href={row.link}>
                          <svg
                            height="30px"
                            width="30px"
                            version="1.1"
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
                            <g>
                              <path
                                style={{ fill: "#FFFFFF" }}
                                d="M363.043,109.466H148.958c-21.809,0-39.49,17.68-39.49,39.49v214.085
		c0,21.811,17.68,39.49,39.49,39.49h105.584l0.183-104.722h-27.21c-3.536,0-6.406-2.86-6.418-6.396l-0.133-33.759
		c-0.014-3.553,2.867-6.444,6.42-6.444h27.162v-32.618c0-37.852,23.118-58.463,56.884-58.463h27.71c3.543,0,6.42,2.874,6.42,6.42
		v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.239h40.351
		c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826
		c21.809,0,39.49-17.682,39.49-39.491v-214.09C402.533,127.147,384.852,109.466,363.043,109.466L363.043,109.466z"
                              />
                              <polygon
                                style={{ fill: "#FFFFFF" }}
                                points="254.542,402.53 254.725,297.808 254.277,297.808 254.277,402.53 	"
                              />
                            </g>
                            <path
                              style={{ fill: "#D1D1D1" }}
                              d="M363.043,109.466H254.277v141.741h0.269V218.59c0-37.852,23.118-58.463,56.884-58.463h27.71
	c3.543,0,6.42,2.874,6.42,6.42v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.238
	h40.351c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826
	c21.809,0,39.49-17.682,39.49-39.491V148.956C402.533,127.147,384.852,109.466,363.043,109.466z"
                            />
                          </svg>
                        </a>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
