// icon:tether | Simple Icons https://simpleicons.org | SimpleIcons.org
import * as React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
  noBackground?: boolean
}

function IconZTC({ ...restProps }: Props) {
  return (
    <svg
      viewBox="0 0 44 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clip-path="url(#a)">
        <path
          d="M22 5.813c7.761 0 15.076-1.92 21.5-5.313v3.631c0 .883-.507 1.69-1.313 2.042a50.267 50.267 0 0 1-5.146 1.915h4.196v1.137a2.269 2.269 0 0 1-2.263 2.275H5.026a2.269 2.269 0 0 1-2.263-2.275V8.088H6.96a50.272 50.272 0 0 1-5.146-1.915A2.215 2.215 0 0 1 .5 4.13V.5A45.894 45.894 0 0 0 22 5.813Z"
          fill="url(#b)"
        />
        <path
          d="M34.692 13.5A2.297 2.297 0 0 1 37 15.786v19.428a2.297 2.297 0 0 1-2.308 2.286h-3.461V20.357c0-.631-.517-1.143-1.154-1.143H13.923c-.637 0-1.154.512-1.154 1.143V37.5H9.308A2.297 2.297 0 0 1 7 35.214V15.786A2.297 2.297 0 0 1 9.308 13.5h25.384Z"
          fill="url(#c)"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1=".5"
          y1="6"
          x2="43.5"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F9F128" />
          <stop offset=".5" stop-color="#C2F147" />
          <stop offset="1" stop-color="#2CEAA3" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="7"
          y1="25.5"
          x2="37"
          y2="25.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F9F128" />
          <stop offset=".5" stop-color="#C2F147" />
          <stop offset="1" stop-color="#2CEAA3" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" transform="translate(0 .5)" d="M0 0h93.06v37H0z" />
        </clipPath>
      </defs>
    </svg>
  )
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <mask
        id="mask0_6665_19186"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="6"
        y="6"
        width="68"
        height="68"
      >
        <path
          d="M73.3334 6.66666H6.66675V73.3333H73.3334V6.66666Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_6665_19186)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M40.0001 73.3333C58.4095 73.3333 73.3334 58.4095 73.3334 40C73.3334 21.5905 58.4095 6.66666 40.0001 6.66666C21.5906 6.66666 6.66675 21.5905 6.66675 40C6.66675 58.4095 21.5906 73.3333 40.0001 73.3333ZM58.6324 25.7333C53.0682 28.6575 46.7326 30.312 40.0106 30.312C33.2886 30.312 26.953 28.6575 21.3889 25.7333V28.8625C21.3889 29.6236 21.8278 30.3193 22.5259 30.622C23.973 31.2492 25.4605 31.8009 26.9833 32.2721H23.349V33.2523C23.349 34.3348 24.2266 35.2125 25.3093 35.2125H54.7119C55.7946 35.2125 56.6722 34.3348 56.6722 33.2523V32.2721H53.0379C54.5607 31.8009 56.0482 31.2492 57.4953 30.622C58.1936 30.3193 58.6324 29.6236 58.6324 28.8625V25.7333ZM52.7518 39.1116C52.7518 38.0291 51.8742 37.1515 50.7917 37.1515H29.2297C28.147 37.1515 27.2694 38.0291 27.2694 39.1116V55.7732C27.2694 56.8557 28.147 57.7333 29.2297 57.7333H32.17V43.032C32.17 42.4907 32.6087 42.0519 33.1499 42.0519H46.8713C47.4126 42.0519 47.8514 42.4907 47.8514 43.032V57.7333H50.7917C51.8742 57.7333 52.7518 56.8557 52.7518 55.7732V39.1116Z"
          fill="url(#paint0_linear_6665_19186)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_6665_19186"
          x1="40.0001"
          y1="6.66666"
          x2="40.0001"
          y2="73.3333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F0B90B" />
          <stop offset="1" stop-color="#FFE288" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default IconZTC
