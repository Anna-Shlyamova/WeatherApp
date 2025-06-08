import { ReactElement } from "react";

export interface Widget {
  id: string;
  name: string;
  nameRus: string;
  layout: ReactElement;
  fullLayout: ReactElement;
  previewLayout: ReactElement;
}
