import { Router } from "express";
import upload from "../middlewares/upload.js";
import {
  myProject,
  insertProject,
  detailProject,
} from "../controllers/projectController.js";

const router = Router();

router.get("/myProject", myProject);

router.post("/myProject", upload.single("image"), insertProject);

router.get("/detilProject", detailProject);
router.get("/detailProject/:id", detailProject);


export default router;
