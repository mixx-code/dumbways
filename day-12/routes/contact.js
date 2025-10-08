import { Router } from "express";
import {
  contact,
  handleContact,
  listContact,
} from "../controllers/contactController.js";

const router = Router();

router.get("/contact", contact);

router.post("/contact", handleContact);

router.get("lisContacts", listContact);

export default router;
