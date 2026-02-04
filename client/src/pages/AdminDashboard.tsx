/**
 * Admin Dashboard for IPAC
 * Manage projects, inquiries, and file uploads
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { FileUp, MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"inquiries" | "projects">("inquiries");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Queries
  const inquiriesQuery = trpc.inquiries.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const projectsQuery = trpc.projects.list.useQuery();

  // Mutations
  const createInquiryMutation = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      toast.success("استفسار تم إنشاؤه بنجاح");
      inquiriesQuery.refetch();
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    },
  });

  const updateInquiryMutation = trpc.inquiries.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الاستفسار");
      inquiriesQuery.refetch();
    },
  });

  const fileUploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      toast.success("تم رفع الملف بنجاح");
      setSelectedFile(null);
    },
    onError: (error) => {
      toast.error(`خطأ في الرفع: ${error.message}`);
    },
  });

  // Check authorization
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive mb-4">
              <AlertCircle size={24} />
              <span className="font-semibold">غير مصرح</span>
            </div>
            <p>يجب أن تكون مسؤول لتتمكن من الوصول إلى لوحة التحكم</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const base64Data = base64.split(",")[1];

      await fileUploadMutation.mutateAsync({
        filename: file.name,
        fileData: base64Data,
        mimeType: file.type,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">لوحة التحكم</h1>
          <p className="text-muted-foreground">مرحباً {user?.name}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === "inquiries"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="inline mr-2" size={20} />
            الاستفسارات
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === "projects"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            المشاريع
          </button>
        </div>

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            {inquiriesQuery.isLoading ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">جاري التحميل...</p>
                </CardContent>
              </Card>
            ) : inquiriesQuery.data && inquiriesQuery.data.length > 0 ? (
              inquiriesQuery.data.map((inquiry: any) => (
                <Card key={inquiry.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{inquiry.subject}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          من: {inquiry.name} ({inquiry.email})
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          inquiry.status === "new"
                            ? "bg-blue-100 text-blue-800"
                            : inquiry.status === "reviewed"
                            ? "bg-yellow-100 text-yellow-800"
                            : inquiry.status === "responded"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">الرسالة:</p>
                      <p className="text-sm">{inquiry.message}</p>
                    </div>
                    {inquiry.phone && (
                      <p className="text-sm">
                        <span className="font-semibold">الهاتف:</span> {inquiry.phone}
                      </p>
                    )}
                    {inquiry.company && (
                      <p className="text-sm">
                        <span className="font-semibold">الشركة:</span> {inquiry.company}
                      </p>
                    )}
                    <div className="flex gap-2 pt-4">
                      <Button
                        size="sm"
                        onClick={() =>
                          updateInquiryMutation.mutate({
                            id: inquiry.id,
                            data: {
                              status:
                                inquiry.status === "new"
                                  ? "reviewed"
                                  : inquiry.status === "reviewed"
                                  ? "responded"
                                  : "closed",
                            },
                          })
                        }
                      >
                        تحديث الحالة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">لا توجد استفسارات</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>رفع ملف</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <FileUp size={20} className="text-accent" />
                    <span className="text-sm font-semibold">اختر ملف</span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </label>
                  {selectedFile && (
                    <span className="text-sm text-muted-foreground">{selectedFile.name}</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {projectsQuery.isLoading ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">جاري التحميل...</p>
                </CardContent>
              </Card>
            ) : projectsQuery.data && projectsQuery.data.length > 0 ? (
              projectsQuery.data.map((project: any) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.titleAr || project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">{project.descriptionAr || project.description}</p>
                    <p className="text-sm text-muted-foreground">
                      الموقع: {project.locationAr || project.location}
                    </p>
                    <p className="text-sm">
                      الحالة:{" "}
                      <span className="font-semibold">
                        {project.status === "planning"
                          ? "قيد التخطيط"
                          : project.status === "in_progress"
                          ? "قيد التنفيذ"
                          : "مكتمل"}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">لا توجد مشاريع</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
