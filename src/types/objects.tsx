import { StateSetter } from "./setState";


export type consoleContent =  string[];

export type matrixItemObject = Record<string, any>;

export type activeColor ={
    color:string
    setColor: StateSetter<string>
  }
    