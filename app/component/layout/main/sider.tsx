"use client";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";
import { useParams } from "next/navigation";

interface Page {
  title: string;
  href: string;
  icon?: ReactElement;
}

const MainSider = () => {
  const userId = useParams().userId as string;

  const pages: Page[] = [
    { title: "首頁", href: `/${userId}/home` },
    { title: "委託單", href: `/${userId}/order` },
    { title: "金鑰", href: `/${userId}/secret` },
  ];

  return (
    <Box minHeight="100vh" minWidth="300px">
      <List>
        {pages.map((p) => (
          <Link href={p.href} key={`sider_${p.href}`}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>{p.icon}</ListItemIcon>
                <ListItemText primary={p.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default MainSider;
