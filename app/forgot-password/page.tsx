"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, KeyRound, ArrowLeft, CheckCircle2, ShieldCheck, Lock, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Step = "email" | "otp" | "success"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("email")

  // Email step
  const [email, setEmail] = useState("")
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState("")

  // OTP step
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState("")

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailLoading(true)
    setEmailError("")

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()

      if (res.ok) {
        setStep("otp")
      } else {
        setEmailError(data.error || "Gagal mengirim kode OTP.")
      }
    } catch {
      setEmailError("Terjadi kesalahan koneksi. Coba lagi.")
    }

    setEmailLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setOtpLoading(true)
    setOtpError("")

    if (newPassword !== confirmPassword) {
      setOtpError("Password baru tidak cocok.")
      setOtpLoading(false)
      return
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, newPassword, confirmPassword }),
      })
      const data = await res.json()

      if (res.ok) {
        setStep("success")
      } else {
        setOtpError(data.error || "Gagal mereset password.")
      }
    } catch {
      setOtpError("Terjadi kesalahan koneksi. Coba lagi.")
    }

    setOtpLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 rounded-full bg-primary/30"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md px-6"
      >
        {/* Card */}
        <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl border border-primary/10 relative overflow-hidden">
          {/* Top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

          <AnimatePresence mode="wait">
            {/* ====== STEP 1: EMAIL ====== */}
            {step === "email" && (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                    <div className="relative w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </motion.div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold tracking-tight mb-1">Lupa Password?</h1>
                  <p className="text-sm text-muted-foreground">
                    Masukkan email admin Anda untuk menerima kode OTP
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email admin"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {emailError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span>{emailError}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full h-11 text-sm font-semibold tracking-wide transition-all"
                  >
                    {emailLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Kirim Kode OTP
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* ====== STEP 2: OTP + NEW PASSWORD ====== */}
            {step === "otp" && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                    <div className="relative w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center">
                      <KeyRound className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </motion.div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold tracking-tight mb-1">Verifikasi & Reset</h1>
                  <p className="text-sm text-muted-foreground">
                    Cek email Anda untuk kode OTP 6 digit
                  </p>
                </div>

                {/* Success indicator */}
                <div className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-5 text-green-500">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Kode OTP telah dikirim ke <strong>{email}</strong></span>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  {/* OTP Input */}
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium">Kode OTP</Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        placeholder="Masukkan 6 digit kode"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors text-center text-lg tracking-[0.3em] font-mono font-bold"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">Password Baru</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type={showNew ? "text" : "password"}
                        placeholder="Minimal 6 karakter"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-10 pr-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Konfirmasi Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Ketik ulang password baru"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {newPassword && confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Password tidak cocok.</p>
                    )}
                  </div>

                  {otpError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                    >
                      <KeyRound className="w-4 h-4 flex-shrink-0" />
                      <span>{otpError}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={otpLoading || otp.length < 6}
                    className="w-full h-11 text-sm font-semibold tracking-wide transition-all"
                  >
                    {otpLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4 mr-2" />
                        Reset Password
                      </>
                    )}
                  </Button>

                  {/* Resend OTP */}
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Tidak menerima kode? Kirim ulang
                  </button>
                </form>
              </motion.div>
            )}

            {/* ====== STEP 3: SUCCESS ====== */}
            {step === "success" && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                  </div>
                </motion.div>

                <h1 className="text-2xl font-bold tracking-tight mb-2">Password Berhasil Direset!</h1>
                <p className="text-sm text-muted-foreground mb-8">
                  Silakan login dengan password baru Anda.
                </p>

                <Button
                  onClick={() => router.push("/login")}
                  className="w-full h-11 text-sm font-semibold tracking-wide"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <a href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Kembali ke Login
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
