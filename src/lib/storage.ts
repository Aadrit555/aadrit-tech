import fs from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  userAgent: string;
  receivedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const AUDIT_FILE = path.join(DATA_DIR, "audit.log");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
  }
}

export function saveMessage(msg: Omit<ContactMessage, "id" | "receivedAt">): ContactMessage {
  ensureDataDir();
  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const messageObj: ContactMessage = {
    ...msg,
    id,
    receivedAt: new Date().toISOString(),
  };

  let messages: ContactMessage[] = [];
  if (fs.existsSync(MESSAGES_FILE)) {
    try {
      messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf-8"));
    } catch {
      messages = [];
    }
  }

  messages.unshift(messageObj);
  // Cap messages to prevent uncontrolled disk growth
  if (messages.length > 500) messages = messages.slice(0, 500);

  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), {
    mode: 0o600,
    encoding: "utf-8",
  });

  logSecurityEvent("MESSAGE_RECEIVED", `Message ID ${id} from ${msg.email} (${msg.ip})`);
  return messageObj;
}

export function getMessages(): ContactMessage[] {
  ensureDataDir();
  if (!fs.existsSync(MESSAGES_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function logSecurityEvent(type: string, details: string) {
  ensureDataDir();
  const line = `[${new Date().toISOString()}] [${type}] ${details}\n`;
  try {
    fs.appendFileSync(AUDIT_FILE, line, { mode: 0o600, encoding: "utf-8" });
  } catch {
    // Fail silently in high-concurrency or read-only environments
  }
}

export function getRecentAuditLogs(limit: number = 50): string[] {
  ensureDataDir();
  if (!fs.existsSync(AUDIT_FILE)) return [];
  try {
    const content = fs.readFileSync(AUDIT_FILE, "utf-8");
    const lines = content.trim().split("\n").filter(Boolean);
    return lines.slice(-limit).reverse();
  } catch {
    return [];
  }
}

