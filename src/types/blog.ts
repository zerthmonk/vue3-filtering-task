// re-export adressing Vue import types issue
// issue: https://github.com/vuejs/core/issues/4294
// workaround: https://github.com/vuejs/core/issues/4294#issuecomment-1238128726

import type { FilterEnum } from "@/misc/constants";

type AllowedFields = keyof typeof FilterEnum;

interface Filter {
  _id: string;
  apply: Function;
}

interface StoreFilter {
  [key: Filter["_id"]]: Filter["apply"];
}

interface StoreLabel {
  [key: string]: string;
}

export type { Filter, StoreFilter, StoreLabel, AllowedFields };
