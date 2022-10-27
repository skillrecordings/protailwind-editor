// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const tailwindConfig: any = {
  content: [],
  theme: {
    extend: {
      screens: {
        television: "90000px",
      },
      spacing: {
        "128": "32rem",
      },
      colors: {
        // https://icolorpalette.com/color/molten-lava
        lava: "#b5332e",
        // Taken from https://icolorpalette.com/color/ocean-blue
        ocean: {
          50: "#f2fcff",
          100: "#c1f2fe",
          200: "#90e9ff",
          300: "#5fdfff",
          400: "#2ed5ff",
          500: "#00cafc",
          600: "#00a3cc",
          700: "#007c9b",
          800: "#00546a",
          900: "#002d39",
        },
      },
    },
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.send(req.query["config"]);
}
