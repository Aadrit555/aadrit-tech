import fs from "fs";
import path from "path";
import os from "os";

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

function resolveDataDir(): string {
  const localDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true, mode: 0o700 });
    }
    const testFile = path.join(localDir, ".test-write");
    fs.writeFileSync(testFile, "ok");
    fs.unlinkSync(testFile);
    return localDir;
  } catch {
    // Read-only filesystem detected (e.g., serverless environments)
    const tmpDir = path.join(os.tmpdir(), "portfolio-data");
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true, mode: 0o700 });
      }
      return tmpDir;
    } catch {
      return os.tmpdir();
    }
  }
}

const DATA_DIR = resolveDataDir();
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const AUDIT_FILE = path.join(DATA_DIR, "audit.log");

export type StorageMode = "filesystem" | "temporary" | "memory";

export function getStorageMode(): StorageMode {
  const localDir = path.join(process.cwd(), "data");
  if (DATA_DIR === localDir) return "filesystem";
  if (DATA_DIR.includes("portfolio-data") || DATA_DIR === os.tmpdir()) return "temporary";
  return "memory";
}

// In-memory buffer fallback for environments with transient storage limits
const memoryMessages: ContactMessage[] = [];
const memoryAudit: string[] = [];

export function saveMessage(msg: Omit<ContactMessage, "id" | "receivedAt">): ContactMessage {
  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const messageObj: ContactMessage = {
    ...msg,
    id,
    receivedAt: new Date().toISOString(),
  };

  memoryMessages.unshift(messageObj);
  if (memoryMessages.length > 500) memoryMessages.pop();

  try {
    let messages: ContactMessage[] = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf-8"));
      } catch {
        messages = [];
      }
    }

    messages.unshift(messageObj);
    if (messages.length > 500) messages = messages.slice(0, 500);

    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), {
      mode: 0o600,
      encoding: "utf-8",
    });
  } catch (err) {
    console.warn("Notice: Message saved to in-memory buffer (read-only filesystem):", err);
  }

  logSecurityEvent("MESSAGE_RECEIVED", `Message ID ${id} from ${msg.email} (${msg.ip})`);
  return messageObj;
}

export function getMessages(): ContactMessage[] {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) return memoryMessages;
    const data = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf-8"));
    return Array.isArray(data) && data.length > 0 ? data : memoryMessages;
  } catch {
    return memoryMessages;
  }
}

export function logSecurityEvent(type: string, details: string) {
  const line = `[${new Date().toISOString()}] [${type}] ${details}\n`;
  memoryAudit.unshift(line.trim());
  if (memoryAudit.length > 100) memoryAudit.pop();

  try {
    fs.appendFileSync(AUDIT_FILE, line, { mode: 0o600, encoding: "utf-8" });
  } catch {
    // Fail silently in read-only environments
  }
}

export function getRecentAuditLogs(limit: number = 50): string[] {
  try {
    if (!fs.existsSync(AUDIT_FILE)) return memoryAudit.slice(0, limit);
    const content = fs.readFileSync(AUDIT_FILE, "utf-8");
    const lines = content.trim().split("\n").filter(Boolean);
    const combined = [...lines.slice(-limit).reverse(), ...memoryAudit];
    return Array.from(new Set(combined)).slice(0, limit);
  } catch {
    return memoryAudit.slice(0, limit);
  }
}
