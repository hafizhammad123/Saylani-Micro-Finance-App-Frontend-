import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#99ca3c",
        color: "white",
        py: 2,
        textAlign: "center",
        mt:"70px"
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Saylani Welfare - All Rights Reserved
      </Typography>
    </Box>
  );
}
