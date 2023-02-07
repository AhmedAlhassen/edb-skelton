import { Box, Container, Button, Typography, Divider } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import logo from "./edb.jpg";

const Invoice = ({ data }) => {
  const recipttRef = useRef();
  console.log(data);

  const handlePrint = useReactToPrint({
    content: () => recipttRef.current,
  });

  return (
    <Container>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        textAlign="right"
        ref={recipttRef}
      >
        <Box
          sx={{ gridColumn: "span 4" }}
          display="grid"
          alignItems="center"
          justifyContent="end"
        >
          <img src={logo} width={100} height={100} />
        </Box>
        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ gridColumn: "span 4" }}
        >
          {data?.tranDate}
        </Typography>
        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          {data?.voucher} : رقم الايصال
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          الرقم الجامعي: {data?.uniNo}
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          المبلغ : {data?.amount}
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          العمولة : {data?.commission}
        </Typography>

        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          الفرع : {data?.branch}
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          العام الدراسي : {data?.classNo}
        </Typography>
        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />
        <Typography mt="10px" variant="h3" sx={{ gridColumn: "span 2" }}>
          الختم
        </Typography>
        <Typography mt="10px" variant="h3" sx={{ gridColumn: "span 2" }}>
          الامضاء
        </Typography>
        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />
      </Box>

      <Box
        mt="20px"
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        width="100%"
      >
        <Button
          color="secondary"
          size="large"
          variant="contained"
          sx={{
            p: "15px",
          }}
          onClick={handlePrint}
        >
          طباعة
        </Button>
      </Box>
    </Container>
  );
};

export default Invoice;
