import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/efcct1.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween justifyContent="space-evenly">
        <Typography color={main}>EFCCT</Typography>
        <Typography color={medium}>Instagram: efcct_.community</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      EFCCT focuses on providing a platform which helps students to grow, connect and network!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;