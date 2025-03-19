import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";


export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return; 
  }
  next(); 
};