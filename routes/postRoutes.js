import express from 'express'
import { createPost } from '../controller/postcontroller.js';
import { filterPost } from '../controller/filterPost.js';

const router=express.Router();

router.post('/create/post',createPost);
router.post('/filter',filterPost);

export default router;