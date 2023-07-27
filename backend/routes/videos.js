import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  sub,
  trend,
  updateVideo,
  getByTag,
  search,
} from "../controllers/video.js";

const router = express.Router();

// CREATE A VIDEO
router.post("/", verifyToken, addVideo);

// UPDATE A VIDEO
router.put("/:id", verifyToken, updateVideo);

// DELETE A VIDEO
router.delete("/:id", verifyToken, deleteVideo);

// GET A VIDEO
router.get("/find/:id", getVideo);

// ADD A VIEW
router.put("/view/:id", addView);

// GET TREND VIDEOS
router.get("/trend", trend);

// GET RANDOM VIDEOS
router.get("/random", random);

// SUBSCRIBE
router.get("/sub", verifyToken, sub);

// GET A VIDEO BY TAG
router.get("/tags", getByTag);

// GET A VIDEO BY SEARCH
router.get("/search", search);

export default router;
