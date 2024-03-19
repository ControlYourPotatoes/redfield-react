import * as React from "react";
const SvgSunny = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <path
      fill="#FF9800"
      d="M38 38s-9-3-14-3-14 3-14 3 3-10 3-14-3-14-3-14 9 3 14 3 14-3 14-3-3 10-3 14 3 14 3 14"
    />
    <path
      fill="#FF9800"
      d="M43 24s-8.222 4.778-11.222 7.778S24 43 24 43s-4.278-7.722-7.778-11.222S5 24 5 24s8.221-4.777 11.222-7.777S24 5 24 5s4.779 8.223 7.778 11.223S43 24 43 24"
    />
    <path
      fill="#FFEB3B"
      d="M14 24c0 5.524 4.477 10 10 10s10-4.476 10-10-4.477-10-10-10-10 4.476-10 10"
    />
  </svg>
);
export default SvgSunny;
