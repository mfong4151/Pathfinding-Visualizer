import React from "react"
import { matrixItemObject } from "./objects"
import { startStop } from "./positions"


export type setBoolean = React.Dispatch<React.SetStateAction<boolean>>;
export type setString = React.Dispatch<React.SetStateAction<string>>;
export type setMatItemObjMatrix = React.Dispatch<React.SetStateAction<matrixItemObject[][]>>;
export type setStartStop = React.Dispatch<React.SetStateAction<startStop>>;