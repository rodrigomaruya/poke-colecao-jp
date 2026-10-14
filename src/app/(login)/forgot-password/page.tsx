import { ForgotPassword } from "./forgot-password";
import { AuthHeader } from "@/components/auth-header";
export default function ForgotPasswordPage() {
  return (
    <main className="">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <AuthHeader />
        <ForgotPassword />
        <a href="/" className="p-2 text-blue-300 hover:text-blue-500">
          Voltar para Home
        </a>
      </div>
    </main>
  );
}
