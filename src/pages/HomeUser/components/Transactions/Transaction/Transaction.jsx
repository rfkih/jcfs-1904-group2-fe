import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardActions,
  Button,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";
import axios from "../../../../../utils/axios";
import { useParams } from "react-router-dom";

function Transaction({ transaction, change, setChange }) {
  const params = useParams();

  const date = moment(transaction.created_at).utc().format("LLL");

  const onButtonClick = () => {
    putTransactionStatusComplete();
  };

  const putTransactionStatusComplete = async () => {
    try {
      const res = await axios.put(`/transaction/status/${transaction.id}`, {
        params: { status: "complete" },
      });
      const { data } = res;
      console.log(data);

      setChange(!change);
    } catch (error) {
      console.log(alert(error.message));
    }
  };
  
  return (
    <Container>
      <Card sx={{ display: "flex", flexDirection: "row" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="div"
                >
                  {date}
                </Typography>
                <Typography component="div" variant="h6">
                  Status : {transaction.transactionStatus}
                </Typography>
                <Typography component="div" variant="h6">
                  Total Amount : {transaction.totalPrice}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="div"
              >
                {transaction.invoice}
              </Typography>
              {transaction.isByPresciption ? (
                <Typography>Custom Order</Typography>
              ) : (
                <Typography> Normal Order</Typography>
              )}
            </CardContent>
            <CardActions>
              {transaction.transactionStatus === "sent" ? (
                <Button
                  onClick={onButtonClick}
                  variant="outlined"
                  color="primary"
                >
                  {" "}
                  <Typography>Package Received</Typography>{" "}
                </Button>
              ) : null}
              {transaction.transactionStatus === "waiting" ? (
                <Button
                  component={Link}
                  to={`/usertransactions/${transaction.id}`}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Complete this Transaction
                </Button>
              ) : null}
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Transaction;
