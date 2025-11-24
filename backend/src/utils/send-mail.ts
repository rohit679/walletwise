import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getSecret } from '../configuration';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  variables?: Record<string, string>;
}

export async function sendEmail(options: EmailOptions) {
  const { emailFrom, smtp } = getSecret();
  const transporter = nodemailer.createTransport({
    host: smtp?.host,
    port: Number(smtp?.port),
    auth: {
      user: smtp?.user,
      pass: smtp?.pass,
    }
  });

  const templatePath = path.join(__dirname, '../templates', `${options.template}.html`);
  let html = fs.readFileSync(templatePath, 'utf8');

  if (options.variables) {
    for (const key in options.variables) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), options.variables[key]);
    }
  }

  return transporter.sendMail({
    from: emailFrom,
    to: options.to,
    subject: options.subject,
    html
  });
}