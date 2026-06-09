import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { Resend } from "resend";

const RESET_TOKEN_KEY = "password_reset_token";
const ADMIN_EMAIL = "muhrahmadhanaidilfadly@gmail.com";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email wajib diisi." },
      { status: 400 }
    );
  }

  // Verify the email matches the admin email
  if (email.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase()) {
    // For security, don't reveal if the email exists or not
    return NextResponse.json({
      success: true,
      message: "Jika email terdaftar, kode OTP telah dikirim.",
    });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in Redis with 10-minute expiration
  try {
    await redis.set(RESET_TOKEN_KEY, otp, { ex: 600 }); // 10 minutes
  } catch (e) {
    console.error("Failed to store OTP in Redis:", e);
    return NextResponse.json(
      { error: "Gagal memproses permintaan. Coba lagi." },
      { status: 500 }
    );
  }

  // Send email with OTP using Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY");
    return NextResponse.json(
      { error: "Server error: Email service tidak dikonfigurasi." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: "Portfolio Admin <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: "🔐 Kode Reset Password - Portfolio Admin",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">🔐 Reset Password</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Portfolio Admin Dashboard</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #ccc; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
              Anda menerima email ini karena ada permintaan reset password untuk akun admin Anda. Gunakan kode OTP berikut:
            </p>
            <div style="background: #111; border: 2px solid #6366f1; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 24px;">
              <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #6366f1; font-family: 'Courier New', monospace;">${otp}</span>
            </div>
            <p style="color: #888; font-size: 12px; line-height: 1.5; margin: 0;">
              ⏱️ Kode ini berlaku selama <strong style="color: #ccc;">10 menit</strong>.<br/>
              Jika Anda tidak meminta reset password, abaikan email ini.
            </p>
          </div>
          <div style="border-top: 1px solid #222; padding: 16px 32px; text-align: center;">
            <p style="color: #555; font-size: 11px; margin: 0;">© Portfolio Admin System</p>
          </div>
        </div>
      `,
    });
  } catch (e) {
    console.error("Failed to send email:", e);
    return NextResponse.json(
      { error: "Gagal mengirim email. Coba lagi nanti." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Kode OTP telah dikirim ke email Anda.",
  });
}
