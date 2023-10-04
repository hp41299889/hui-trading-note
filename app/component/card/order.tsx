"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

interface Props {
  orderId: string;
  side: "BUY" | "SELL";
  symbol: string;
  time: string;
  price: number;
  amount: number;
  reason?: string;
}

const OrderCard = (props: Props) => {
  const { orderId, side, symbol, time, price, amount, reason } = props;

  const onUpdate = async (id: string) => {
    console.log(id);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Grid container>
            <Grid lg>{side === "BUY" ? "多" : "空"}</Grid>
            <Grid lg>{symbol}</Grid>
          </Grid>
        }
        subheader={time}
      />
      <CardContent>
        <Grid container>
          <Grid lg={6}>
            <Typography>委託價格</Typography>
            {price}
          </Grid>
          <Grid lg={6}>
            <Typography>數量</Typography>
            {amount}
          </Grid>
          <Grid lg={12}>
            <TextField label="理由" multiline fullWidth defaultValue={reason} />
          </Grid>
          <Grid lg={3} lgOffset={9}>
            <CardActions>
              <Button variant="outlined" onClick={() => onUpdate(orderId)}>
                更新
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
