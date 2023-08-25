import { StateSetter } from "./setState";

export interface MapConditionalString {
    [key: string]: string;
  }

export interface  ColorStates{
  color1: string,
  color2: string,
  color3: string,
  color4: string,
  setColor1:StateSetter<string>,
  setColor2:StateSetter<string>,
  setColor3:StateSetter<string>,
  setColor4:StateSetter<string>,

}