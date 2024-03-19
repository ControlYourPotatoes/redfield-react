import * as React from "react";
const SvgPartlyCloudy = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <path fill="#FF9800" d="M8 10.001h17v17H8z" />
    <path fill="#FF9800" d="M4 18.5 16.5 6 29 18.5 16.5 31z" />
    <path
      fill="#FFEB3B"
      d="M10 18.5c0 3.591 2.909 6.5 6.5 6.5s6.5-2.909 6.5-6.5-2.909-6.5-6.5-6.5-6.5 2.909-6.5 6.5"
    />
    <g fill="#BBDEFB">
      <path d="M29.5 17a8.5 8.5 0 1 0 0 17 8.5 8.5 0 1 0 0-17" />
      <path d="M37 26.893a7 7 0 1 0 0 14 7 7 0 1 0 0-14M11 27a7 7 0 1 0 0 14 7 7 0 1 0 0-14" />
      <path d="M17.5 20a6.5 6.5 0 1 0 0 13 6.5 6.5 0 1 0 0-13" />
      <path d="M25 24.893a7 7 0 1 0 0 14 7 7 0 1 0 0-14" />
      <path d="M7 37a4 4 0 0 0 4 4h25a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4H11a4 4 0 0 0-4 4z" />
    </g>
  </svg>
);
export default SvgPartlyCloudy;
