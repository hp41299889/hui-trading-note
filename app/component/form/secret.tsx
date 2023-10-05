"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Prisma, Secret, Exchange } from "@prisma/client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { patchSecret, postSecret } from "@/util/client/api";

interface ExchangeItem {
  name: Exchange;
  label: string;
}
const exchanges: ExchangeItem[] = [{ name: "BINANCE", label: "幣安Binance" }];

interface Props {
  userId: string;
  secrets: Secret[];
}

const SecretForm = (props: Props) => {
  const { userId, secrets } = props;
  const [secret, setSecret] = useState<Secret>();

  const { getValues, register, handleSubmit, control } =
    useForm<Prisma.SecretCreateWithoutUserInput>({
      defaultValues: { exchange: "BINANCE" },
    });

  const onSubmit = async (formValues: Prisma.SecretCreateWithoutUserInput) => {
    try {
      let res;
      if (!secret) {
        res = await postSecret(userId, formValues);
      } else {
        res = await patchSecret(userId, String(secret.id), formValues);
      }
      setSecret(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const secret = secrets.find((s) => s.exchange === getValues("exchange"));
    setSecret(secret);
  }, [getValues, secrets]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Controller
          control={control}
          name="exchange"
          render={({ field: { value, onChange } }) => (
            <FormControl>
              <InputLabel>交易所</InputLabel>
              <Select value={value} onChange={onChange}>
                {exchanges.map((e) => (
                  <MenuItem key={`exchange_${e.name}`} value={e.name}>
                    {e.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <TextField label="Api key" {...register("apiKey")} />
        <TextField label="Secret Key" {...register("secretKey")} />
        <Button type="submit">送出</Button>
      </Stack>
    </Box>
  );
};

export default SecretForm;
