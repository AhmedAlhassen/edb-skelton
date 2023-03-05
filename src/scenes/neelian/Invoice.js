import { Box, Container, Button, Typography, Divider } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import moment from "moment/moment";
import logo from "./edb.jpg";
import { json } from "react-router-dom";

const Invoice = ({ data, name }) => {
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
        p={5}
      >
        <Box
          sx={{ gridColumn: "span 4" }}
          display="grid"
          alignItems="center"
          justifyContent="center"
        >
          <img src={logo} width={200} height={100} />

          <Typography
            variant="h3"
            textAlign="center"
            sx={{ gridColumn: "span 2" }}
          >
            بنك تنمية الصادرات
            <br />
            نظام التحصيل الالكتروني
            <br />
            اشعار استلام نقدي
          </Typography>
        </Box>

        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />

        <Typography
          variant="h3"
          textAlign="center"
          sx={{ gridColumn: "span 4" }}
        >
          جامعة النيلين
        </Typography>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ gridColumn: "span 4" }}
        >
          {moment(data?.tranDate).format("LLLL")}
        </Typography>

        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />

        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          {data?.uniNo} : الرقم الجامعي
        </Typography>
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          الاسم : {name}
        </Typography>
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          {data?.voucher} : رقم الايصال
        </Typography>
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          العمولة : {data?.commission}
        </Typography>
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          {data?.currency === "1002"
            ? "USD"
            : data?.currency === "1001"
            ? "SDG"
            : null}{" "}
          : العملة
        </Typography>
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          المبلغ المدفوع : {new Intl.NumberFormat().format(data?.amount)}
        </Typography>

        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          {data?.branch} : الفرع
        </Typography>
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          العام الدراسي : {data?.classNo}
        </Typography>

        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          الامضاء
        </Typography>
        <Typography variant="h4" sx={{ gridColumn: "span 2" }}>
          {JSON.parse(localStorage.getItem("presist")).username} : اسم المستخدم
        </Typography>
        <Divider sx={{ gridColumn: "span 4" }} variant="fullWidth" />
        <Typography mt="10px" variant="h4" sx={{ gridColumn: "span 4" }}>
          الختم
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
