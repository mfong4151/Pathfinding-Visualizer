import { setString } from "./setState";

export interface MapConditionalString {
    [key: string]: string;
  }

export interface  ColorStates{
  color1: string,
  color2: string,
  color3: string,
  color4: string,
  setColor1:setString,
  setColor2:setString,
  setColor3:setString,
  setColor4:setString,

}