import { Box } from "@mui/material";

import SecretForm from "@/app/component/form/secret";
import { getSecret } from "@/util/server";

const fetchSecrets = async (userId: string) => {
  try {
    const res = await getSecret(userId);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

const Page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const secrets = await fetchSecrets(userId);

  return (
    <Box>
      <SecretForm userId={userId} secrets={secrets} />
    </Box>
  );
};

export default Page;
