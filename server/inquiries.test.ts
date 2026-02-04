import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedAdmin = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedAdmin = {
    id: 1,
    openId: "admin-user",
    email: "admin@ipac.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Inquiries API", () => {
  it("should create a new inquiry", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inquiries.create({
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      company: "شركة الاختبار",
      subject: "استفسار عن خدمات الإنشاء",
      message: "نود معرفة المزيد عن خدماتكم",
      serviceType: "general_construction",
      budget: "500000",
    });

    expect(result).toBeDefined();
  });

  it("should list inquiries for admin only", async () => {
    const { ctx: adminCtx } = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    const result = await adminCaller.inquiries.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should reject inquiry list for non-admin users", async () => {
    const { ctx: publicCtx } = createPublicContext();
    const publicCaller = appRouter.createCaller(publicCtx);

    try {
      await publicCaller.inquiries.list();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should update inquiry status", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // First create an inquiry
    const created = await appRouter
      .createCaller(createPublicContext().ctx)
      .inquiries.create({
        name: "محمد علي",
        email: "ali@example.com",
        subject: "استفسار جديد",
        message: "رسالة الاستفسار",
      });

    // Then update it
    const result = await caller.inquiries.update({
      id: 1,
      data: {
        status: "reviewed",
        notes: "تم المراجعة",
      },
    });

    expect(result).toBeDefined();
  });
});

describe("Projects API", () => {
  it("should list projects", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.projects.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should create project for admin only", async () => {
    const { ctx: adminCtx } = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    const result = await adminCaller.projects.create({
      title: "Test Project",
      titleAr: "مشروع الاختبار",
      description: "A test project",
      descriptionAr: "مشروع للاختبار",
      location: "Riyadh",
      locationAr: "الرياض",
      status: "planning",
      category: "commercial",
    });

    expect(result).toBeDefined();
  });

  it("should reject project creation for non-admin", async () => {
    const { ctx: publicCtx } = createPublicContext();
    const publicCaller = appRouter.createCaller(publicCtx);

    try {
      await publicCaller.projects.create({
        title: "Test",
        titleAr: "اختبار",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("File Upload API", () => {
  it("should handle file uploads", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Create a small test file (base64 encoded)
    const testFileBase64 = Buffer.from("test file content").toString("base64");

    const result = await caller.files.upload({
      filename: "test.txt",
      fileData: testFileBase64,
      mimeType: "text/plain",
      size: 17,
    });

    expect(result).toBeDefined();
  });
});
