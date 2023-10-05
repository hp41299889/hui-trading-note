import { getServerSession } from "next-auth";
import { Box, Card, CardHeader } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OrderCard from "@/app/component/card/order";
import { getOrders } from "@/util/server";
import { toLocale } from "@/util/client";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const orders = session ? await getOrders(session.user.id, "BINANCE") : [];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid lg>
          <Card>
            <CardHeader title="心法" />
          </Card>
        </Grid>
        <Grid lg>
          <Card>
            <CardHeader title="info" />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {typeof orders === "string"
          ? orders
          : orders.map((o) => (
              <Grid lg={4} key={`orderCard_${o.orderId}`}>
                <OrderCard
                  orderId={String(o.orderId)}
                  type={o.type}
                  side={o.side}
                  symbol={o.symbol}
                  time={toLocale(o.time)}
                  price={Number(o.price)}
                  stopPrice={Number(o.stopPrice)}
                  amount={Number(o.origQty)}
                  reason=""
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};
export default Page;
