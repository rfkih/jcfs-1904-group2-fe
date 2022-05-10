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
  Input,
  TextField,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";

function CustomOrder({ order }) {
  const date = moment(order.created_at).utc().format("LLL");

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
                  Status : {order.status}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="div"
                >
                  Notes : {order.notes}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <CardMedia
              sx={{ width: 151, height: 200 }}
              width="150"
              height="200"
              component="img"
              image={order.image}
              alt="Doctor prescription"
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default CustomOrder;
