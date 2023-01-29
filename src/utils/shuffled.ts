import {Pokemon} from "../type/Pokemon";

export const shuffled = (list:Pokemon[]) => list.sort(()=>Math.random() - 0.5)