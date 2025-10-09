import { Router } from "express";
import {
  contact,
  handleContact,
  listContact,
} from "../controllers/contactController.js";
import { cekLogin } from "../middlewares/auth.js";

const router = Router();

router.get("/contact", cekLogin, contact);

router.post("/contact", cekLogin, handleContact);

router.get("lisContacts", cekLogin, listContact);

export default router;
