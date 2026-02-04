import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { 
  getProjects, 
  createProject, 
  updateProject,
  getInquiries,
  createInquiry,
  updateInquiry,
  createFile
} from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Projects management
  projects: router({
    list: publicProcedure.query(async () => {
      return await getProjects();
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        titleAr: z.string(),
        description: z.string().optional(),
        descriptionAr: z.string().optional(),
        location: z.string().optional(),
        locationAr: z.string().optional(),
        status: z.enum(["planning", "in_progress", "completed"]).optional(),
        budget: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await createProject(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        data: z.any(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await updateProject(input.id, input.data);
      }),
  }),

  // Inquiries management
  inquiries: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
      return await getInquiries();
    }),
    create: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        subject: z.string(),
        message: z.string(),
        serviceType: z.string().optional(),
        budget: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createInquiry(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        data: z.any(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await updateInquiry(input.id, input.data);
      }),
  }),

  // File uploads
  files: router({
    upload: publicProcedure
      .input(z.object({
        filename: z.string(),
        fileData: z.string(), // base64
        mimeType: z.string(),
        size: z.number(),
        inquiryId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const fileKey = `inquiries/${Date.now()}-${Math.random().toString(36).substring(7)}`;
          const buffer = Buffer.from(input.fileData, "base64");
          
          const { url } = await storagePut(fileKey, buffer, input.mimeType);
          
          return await createFile({
            filename: input.filename,
            fileKey,
            url,
            mimeType: input.mimeType,
            size: input.size,
            inquiryId: input.inquiryId,
          });
        } catch (error) {
          console.error("File upload error:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
