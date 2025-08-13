import { Box, Container, Stack, Typography, useMediaQuery, Button, TextField } from "@mui/material"




const Section = () => {

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)");
  return (
    <>

      <Container>
        <Stack mt={"50px"} flexDirection={isMobile || isTablet ? "column" : "row"} gap={"50px"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <Box sx={{ borderRadius: "10px" }} component={"img"} src="../../../section Image 01.png" width={isMobile ? "280px" : "500px"}></Box>
          </Box>
          <Box>
            <Typography sx={{ color: "black", fontWeight: "bold", fontSize: "26px", mb: "10px" }}> Other Projects</Typography>

            <Stack flexDirection={"row"} gap={"30px"} mb={"20px"}>
              <Stack flexDirection={"row"} justifyContent={"center"} alignItems={'center'} sx={{ bgcolor: "#eeeeee", width: "50px", height: "50px", borderRadius: '10px', p: "20px" }}>
                <Box component={"img"} width={"30px"} src="https://icon-library.com/images/liver-icon/liver-icon-13.jpg"></Box>
              </Stack>

              <Box>
                <Typography sx={{ fontSize: "16px", color: "#0D6EFD", fontWeight: 'bold' }}>Hepatitis</Typography>

                <Typography sx={{ fontSize: "14px", color: "#87be41" }}>Saylani Welfare has also set up a clinic for the best treatment of hepatitis patients where hepatitis patients are being treated</Typography>
              </Box>

            </Stack>

            <Stack flexDirection={"row"} gap={"30px"} mb={"20px"}>
              <Stack flexDirection={"row"} justifyContent={"center"} alignItems={'center'} sx={{ bgcolor: "#eeeeee", width: "50px", height: "50px", borderRadius: '10px', p: "20px" }}>
                <Box component={"img"} width={"30px"} src="https://www.clipartmax.com/png/small/103-1038495_font-awesome-house-computer-icons-home-rockford-old-house-icon.png"></Box>
              </Stack>

              <Box>
                <Typography sx={{ fontSize: "16px", color: "#0D6EFD", fontWeight: 'bold' }}>Housing Society </Typography>

                <Typography sx={{ fontSize: "14px", color: "#87be41" }}>Saylani Welfare is also providing its own home facility for the homeless people. So far, thousands of houses and flats have been constructed and given in easy installments</Typography>
              </Box>

            </Stack>


            <Stack flexDirection={"row"} gap={"30px"} mb={"20px"}>
              <Stack flexDirection={"row"} justifyContent={"center"} alignItems={'center'} sx={{ bgcolor: "#eeeeee", width: "50px", height: "50px", borderRadius: '10px', p: "20px" }}>
                <Box component={"img"} width={"30px"} src="https://www.clipartmax.com/png/middle/105-1051505_literacy-intercom-chat-icon-svg.png"></Box>
              </Stack>

              <Box>
                <Typography sx={{ fontSize: "16px", color: "#0D6EFD", fontWeight: 'bold' }}>IT Literacy</Typography>

                <Typography sx={{ fontSize: "14px", color: "#87be41" }}>We are committed to developing more than 1 million software developers, which will add about 100 billion annually to Pakistan's economy and help ease the debt burden on Pakistan</Typography>
              </Box>

            </Stack>


          </Box>
        </Stack>
      </Container>
      <Box
        sx={{
          backgroundImage: `url('https://media.npr.org/assets/img/2020/03/31/gettyimages-1208432717_custom-d773d4d120ffa24c17b9aa9d067dd674642d204d.jpg')`, // yahan apni background image dal
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(18, 99, 222, 0.76)", // blue overlay
          backgroundBlendMode: "overlay",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          px: 2,
          mt: "70px"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 3,
            textAlign: "center",
          }}
        >
          Saylani Guide
        </Typography>

        <Box
          component="form"
          sx={{
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Enter E-Mail Address"
            variant="outlined"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
            }}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            fullWidth
          >
            SUBSCRIBE
          </Button>
        </Box>
      </Box>

    </>
  )
}

export default Section