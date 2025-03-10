import Svg, { Path } from "react-native-svg"

const ErrorLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      fill="#CC4C4C"
      stroke="#F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      strokeWidth={0.5}
      d="M7 12.833c3.208 0 5.833-2.625 5.833-5.833S10.208 1.167 7 1.167 1.167 3.792 1.167 7 3.792 12.833 7 12.833Z"
    />
    <Path
      stroke="#F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      strokeWidth={0.5}
      d="m5.35 8.65 3.3-3.3m0 3.3-3.3-3.3"
    />
  </Svg>
)
export default ErrorLogo;