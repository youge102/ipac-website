import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projects, inquiries, files, services } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Projects queries
export async function createProject(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(projects).values(data);
  return result;
}

export async function getProjects() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateProject(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(projects).set(data).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(projects).where(eq(projects.id, id));
}

// Inquiries queries
export async function createInquiry(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(inquiries).values(data);
  return result;
}

export async function getInquiries() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getInquiryById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateInquiry(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(inquiries).set(data).where(eq(inquiries.id, id));
}

// Files queries
export async function createFile(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(files).values(data);
}

export async function getFilesByInquiry(inquiryId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(files).where(eq(files.inquiryId, inquiryId));
}

export async function getFilesByProject(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(files).where(eq(files.projectId, projectId));
}

// Services queries
export async function getServices() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(services).orderBy(services.order);
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createService(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(services).values(data);
}

export async function updateService(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(services).set(data).where(eq(services.id, id));
}
