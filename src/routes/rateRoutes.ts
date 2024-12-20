import { Router } from "express";
import RateController from "../controllers/rateController";

const router = Router();

// @ts-ignore
router.get("/rates", RateController.getRates);
// @ts-ignore
router.get("/dbrates", RateController.getDBRATES);
// @ts-ignore
router.get("/dbrates/pairs", RateController.getDBPairRATES);

// @ts-ignore
router.post("/dbsave", RateController.saveData);

// @ts-ignore
router.get('/getrates', RateController.getRatesAnalysis);

// @ts-ignore
router.get('/getdems', RateController.getDems);

export default router;