import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// ADD A COMMENT
router.post("/", verifyToken, addComment);

// DELETE A COMMENT
router.delete("/:id", verifyToken, deleteComment);

// GET ALL COMMENTS
router.get("/:videoId", getComments);

export default router;
