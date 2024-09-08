import { category } from "../../utils";
import ping from "./ping";
import displayUser from "./displayUser";
import clear from "./clear";

export default category("Debug", [ping, displayUser, clear]);
