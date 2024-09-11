import { category } from "../../utils";
import clear from "./clear";
import displayUser from "./displayUser";
import ping from "./ping";
import setParser from "./setParser";

export default category("Debug", [ping, displayUser, clear, setParser]);
