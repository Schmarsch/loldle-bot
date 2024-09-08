import { category } from "../../utils";
import ping from "./ping";
import displayUser from "./displayUser";
import clear from "./clear";
import setParser from "./setParser";

export default category("Debug", [ping, displayUser, clear, setParser]);