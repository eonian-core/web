// icon:wallet | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconWallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M17 8V5a1 1 0 00-1-1H6a2 2 0 000 4h12a1 1 0 011 1v3m0 4v3a1 1 0 01-1 1H6a2 2 0 01-2-2V6" />
      <path d="M20 12v4h-4a2 2 0 010-4h4" />
    </svg>
  );
}

export default IconWallet;
