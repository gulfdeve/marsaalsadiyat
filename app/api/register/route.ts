import nodemailer from "nodemailer";
import { getSiteContent } from "@/lib/content";
import { validateRegistration } from "@/lib/validate-registration";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { registerForm } = await getSiteContent();
  const errors = validateRegistration(body, {
    budgets: registerForm.budgets,
    purposes: registerForm.purposes,
  });
  if (errors) {
    return Response.json({ message: "Please check the form and try again.", errors }, { status: 400 });
  }

  const { name, phone, country, budget, purpose } = body as {
    name: string;
    phone: string;
    country: string;
    budget: string;
    purpose: string;
  };

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_TO) {
    return Response.json(
      { message: "Email is not configured yet. Add SMTP credentials to .env and restart the server." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  console.log(
    `[register] sending via ${SMTP_HOST}:${SMTP_PORT ?? 587} as ${SMTP_USER} → ${CONTACT_TO}`
  );

  try {
    await transporter.verify();
  } catch (err) {
    logSmtpError("SMTP connection/auth check failed", err);
    return Response.json(
      { message: "Could not send email right now. Please try again shortly." },
      { status: 502 }
    );
  }

  try {
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO,
      replyTo: undefined,
      subject: `New registration — ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Country: ${country}`,
        `Investment budget: ${budget}`,
        `Purpose: ${purpose}`,
      ].join("\n"),
      html: `
        <h2>New priority registration</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Country:</strong> ${escapeHtml(country)}</p>
        <p><strong>Investment budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Purpose:</strong> ${escapeHtml(purpose)}</p>
      `,
    });

    console.log(
      `[register] sendMail resolved: messageId=${info.messageId} accepted=${JSON.stringify(info.accepted)} rejected=${JSON.stringify(info.rejected)} response=${info.response}`
    );

    if (info.accepted.length === 0 || info.rejected.length > 0) {
      console.error("[register] SMTP server did not fully accept the message — check the recipient address and spam filtering.", info);
      return Response.json(
        { message: "Could not send email right now. Please try again shortly." },
        { status: 502 }
      );
    }
  } catch (err) {
    logSmtpError("Failed to send registration email", err);
    return Response.json(
      { message: "Could not send email right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}

function logSmtpError(message: string, err: unknown) {
  const e = err as { message?: string; code?: string; responseCode?: number; response?: string; command?: string };
  console.error(`[register] ${message}:`, {
    message: e?.message,
    code: e?.code,
    responseCode: e?.responseCode,
    response: e?.response,
    command: e?.command,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
