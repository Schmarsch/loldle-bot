import type { Parser } from "../../types/parsers";
import { category } from "../../utils/parser";
import loldle from "./loldle";

const all_parsers: Parser[] = [loldle];

export default category("gaming", all_parsers);