/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
    extend: {
      colors: {
        vant: {
          DEFAULT: "#1989fa",
          main: "#1989fa",
          n1: "#f5f5f5",
          n2: "#f2f3f5",
          n3: "#ebedf0",
          n4: "#dcdee0",
          t1: "#c8c9cc",
          t2: "#969799",
          t3: "#646566",
          t4: "#323233",
          link: "#576b95",
          success: "#07c160",
          error: "#ee0a24",
          notifytext: "#ed6a0c",
          notifybg: "#fffbe8",
          texthelp: "#faab0c",
        }
      },
      fontSize: ({ theme }) => ({
        ...theme("spacing"),
      }),
    },
    fontFamily: {
      sans: [
        "PingFang SC",
        "Arial",
        "Hiragino Sans GB",
        "Microsoft YaHei",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
