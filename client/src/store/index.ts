import { proxy } from "valtio";

type StateType = {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
  [key: string]: string | boolean;
};

const state: StateType = proxy({
  intro: true, // are we in the home page?
  color: "#EFBD48", // default shirt color
  isLogoTexture: true, // is logo displayed on shirt?
  isFullTexture: false, // is texture applied on the shirt?
  logoDecal: "./threejs.png", // initial logo
  fullDecal: "./texture.jpeg", // initial texture
});

export default state;
