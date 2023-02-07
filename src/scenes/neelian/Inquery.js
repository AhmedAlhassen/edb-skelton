import { useRef } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import logo from "./edb.jpg";
const Inquery = ({ data }) => {
  const recipttRef = useRef();
  const navigate = useNavigate();

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

        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          الرقم الجامعي : {data?.universityno}
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          الاسم : {data?.name01}
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          المبلغ : {data?.rem_feez}
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          {(data.currency = "1001" ? "SDG" : "USD")} : العملة
        </Typography>
        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          رقم الكلية : {data?.fac}
        </Typography>

        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          الفصل الدراسي : {data?.class_no}
        </Typography>

        <Typography variant="h3" sx={{ gridColumn: "span 2" }}>
          الفرع : {data?.class_no}
        </Typography>
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
          onClick={() =>
            navigate("pay", {
              state: {
                uniNo: data.universityno,
                fees: data.rem_feez,
                curr: data.currency,
                classNo: data.class_no,
              },
            })
          }
        >
          دفع
        </Button>
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

export default Inquery;
