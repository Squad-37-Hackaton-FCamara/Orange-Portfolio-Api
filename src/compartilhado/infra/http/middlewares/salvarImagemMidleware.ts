import * as util from "util";
import multer, { Multer } from "multer";
import { RequestHandler } from "express";

const maxSize = 2 * 1024 * 1024;

const processFile: RequestHandler = (multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize }
}) as Multer).single("foto");

const processFileMiddleware = util.promisify(processFile);

export { processFileMiddleware }
