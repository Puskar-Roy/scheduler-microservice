import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/Teacher";
import asyncHandler from "../utils/catchAsync";
import { validateObjectId } from "../middleware/validateIdMiddleware";

const router = express.Router();


const validateTeacherData = (data: any, isUpdate = false) => {
  const errors: string[] = [];

  if (!isUpdate) {
    if (
      !data.email ||
      typeof data.email !== "string" ||
      !data.email.includes("@")
    )
      errors.push("Valid email is required.");
    if (!data.phone || typeof data.phone !== "string" || data.phone.length < 10)
      errors.push("Valid phone number is required.");
    if (
      !data.password ||
      typeof data.password !== "string" ||
      data.password.length < 6
    )
      errors.push("Password must be at least 6 characters.");
  }

  if (!data.name || typeof data.name !== "string")
    errors.push("Name is required.");
  if (!data.primary_subject || typeof data.primary_subject !== "string")
    errors.push("Primary subject is required.");
  if (!data.availability || typeof data.availability !== "object")
    errors.push("Availability must be an object.");
  if (
    data.max_classes_per_day &&
    (data.max_classes_per_day < 1 || data.max_classes_per_day > 10)
  )
    errors.push("Max classes per day should be between 1 and 10.");
  if (
    data.max_consecutive_classes &&
    (data.max_consecutive_classes < 1 || data.max_consecutive_classes > 5)
  )
    errors.push("Max consecutive classes should be between 1 and 5.");
  if (data.role && !["teacher", "admin"].includes(data.role))
    errors.push("Invalid role.");

  return errors;
};


router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { page = "1", limit = "10", subject } = req.query;

    const query: any = subject
      ? { $or: [{ primary_subject: subject }, { secondary_subjects: subject }] }
      : {};

    const teachers = await Teacher.find(query)
      .select("-password") // Hide passwords
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Teacher.countDocuments(query);
    res.json({ total, page: Number(page), limit: Number(limit), teachers });
  })
);


router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validateTeacherData(req.body);
    if (errors.length > 0) return res.status(400).json({ error: errors });

    const { email, phone, password, ...otherDetails } = req.body;

    // Check if email or phone already exists
    const existingTeacher = await Teacher.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingTeacher)
      return res.status(400).json({ error: "Email or phone already in use." });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      ...otherDetails,
      email,
      phone,
      password: hashedPassword,
    });
    await teacher.save();
    res.status(201).json({ message: "Teacher created successfully", teacher });
  })
);


router.get(
  "/:id",
  validateObjectId,
  asyncHandler(async (req: Request, res: Response) => {
    const teacher = await Teacher.findById(req.params.id).select("-password");
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json(teacher);
  })
);

router.put(
  "/:id",
  validateObjectId,
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validateTeacherData(req.body, true);
    if (errors.length > 0) return res.status(400).json({ error: errors });

    // Prevent updating email & password directly
    const { email, password, ...updateData } = req.body;
    if (email || password)
      return res
        .status(400)
        .json({ error: "Email & password cannot be updated directly." });

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    res.json(teacher);
  })
);

router.delete(
  "/:id",
  validateObjectId,
  asyncHandler(async (req: Request, res: Response) => {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.status(204).send();
  })
);

export default router;
