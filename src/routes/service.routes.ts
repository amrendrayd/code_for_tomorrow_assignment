import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { addService, getServices, updateService, deleteService } from "../controllers/service.controller";

const router = express.Router();

router.post("/category/:categoryId/service", protect, addService);
router.get("/category/:categoryId/services", protect, getServices);
router.put("/category/:categoryId/service/:serviceId", protect, updateService);
router.delete("/category/:categoryId/service/:serviceId", protect, deleteService);

export default router;

