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
  type: string;
  side: "BUY" | "SELL";
  symbol: string;
  time: string;
  price: number;
  stopPrice: number;
  amount: number;
  reason?: string;
}

const OrderCard = (props: Props) => {
  const {
    orderId,
    type,
    side,
    symbol,
    time,
    price,
    stopPrice,
    amount,
    reason,
  } = props;

  console.log(side);

  const onUpdate = async (id: string) => {
    console.log(id);
  };

  const orderType = (side: "BUY" | "SELL", type: string) => {
    switch (side) {
      case "BUY": {
        switch (type) {
          case "LIMIT": {
            return "限價多";
          }
          case "STOP_MARKET": {
            return "市價止損多";
          }
          case "TAKE_PROFIT_MARKET": {
            return "市價止盈多";
          }
        }
      }
      case "SELL": {
        switch (type) {
          case "LIMIT": {
            return "限價空";
          }
          case "STOP_MARKET": {
            return "市價止損空";
          }
          case "TAKE_PROFIT_MARKET": {
            return "市價止盈空";
          }
        }
      }
    }
  };

  return (
    <Card className={side === "BUY" ? "bg-lime-300" : "bg-red-300"}>
      <CardHeader
        title={
          <Grid container>
            <Grid lg>{orderType(side, type)}</Grid>
            <Grid lg>{symbol}</Grid>
          </Grid>
        }
        subheader={time}
      />
      <CardContent>
        <Grid container>
          <Grid lg={6}>
            <Typography>委託價格</Typography>
            {price | stopPrice}
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
