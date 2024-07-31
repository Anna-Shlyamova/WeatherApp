import {SxProps, Theme} from "@mui/material";

export const combineSx = (...sxs: Array<SxProps<Theme> | undefined | false>): SxProps<Theme> => {
  if ((sxs.length === 1 && sxs[0]) || (sxs.length === 2 && sxs[0] && !sxs[1])) {
    return sxs[0];
  }
  const combinedSxs = [];
  for (const sx of sxs) {
    if (!sx) continue;
    if (Array.isArray(sx)) {
      for (const _sx of sx) combinedSxs.push(combineSx(_sx));
    } else combinedSxs.push(sx);
  }
  return combinedSxs as SxProps<Theme>;
};