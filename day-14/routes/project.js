import { Router } from "express";
import upload from "../middlewares/upload.js";
import {
  myProject,
  insertProject,
  detailProject,
} from "../controllers/projectController.js";
import { cekLogin } from "../middlewares/auth.js";

const router = Router();

router.get("/myProject", cekLogin, myProject);

router.post("/myProject", cekLogin, upload.single("image"), insertProject);

router.get("/detilProject", cekLogin, detailProject);
router.get("/detailProject/:id", cekLogin, detailProject);


export default router;
