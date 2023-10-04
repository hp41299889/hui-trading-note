import { getServerSession } from "next-auth";
import { Box, Card, CardHeader, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OrderCard from "@/app/component/card/order";
import MainLayout from "@/app/component/layout/main";
import { getOrders } from "@/util/client/api";
import { toLocale } from "@/util/client";

const fetchOrders = async (userId: string, type: string) => {
  return (await getOrders(userId, type)).data.data;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const orders = session ? await fetchOrders(session.user.id, "binance") : [];
  console.log(orders);

  return (
    <MainLayout>
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
          {orders.map((o) => (
            <Grid lg={4} key={`orderCard_${o.orderId}`}>
              <OrderCard
                orderId={String(o.orderId)}
                side={o.side}
                symbol={o.symbol}
                time={toLocale(o.time)}
                price={Number(o.price)}
                amount={Number(o.origQty)}
                reason=""
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};
export default Page;
