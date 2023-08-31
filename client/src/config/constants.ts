import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";
import { Tabs } from "../types";

export const EditorTabs: Tabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs: Tabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export type DecalType = {
  stateProperty: string;
  filterTab: string;
};

type DecalTypesType = {
  logo: DecalType;
  full: DecalType;
  [key: string]: DecalType;
};

export const DecalTypes: DecalTypesType = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
