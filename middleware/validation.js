import { z } from 'zod';

export const foodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  // Accept number or numeric string from clients; coerce to number.
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().optional(),
  description: z.string().optional(),
  image_url: z.union([z.string().url(), z.literal('')]).optional(),
  is_available: z.boolean().default(true)
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

// Helper to validate
export const validate = (schema) => (req, res, next) => {
  try {
    // Apply coercions/defaults so downstream handlers see the validated shape.
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.issues || error.errors
    });
  }
};
