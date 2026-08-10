import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
EMAIL_FROM = os.getenv("EMAIL_FROM", "noreply@aiocrm.com")
REPLY_TO = "support@aiocrm.com"

def get_email_template(title: str, content_html: str, content_text: str):
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 40px 20px; color: #333; }}
            .container {{ max-width: 600px; background: #ffffff; padding: 30px; border-radius: 8px; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }}
            .header {{ text-align: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 20px; }}
            .header h2 {{ margin: 0; color: #2c3e50; font-size: 24px; }}
            .content {{ line-height: 1.6; font-size: 15px; color: #444; }}
            .footer {{ margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center; font-size: 12px; color: #888; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>{title}</h2>
            </div>
            <div class="content">
                {content_html}
            </div>
            <div class="footer">
                <p>This is an automated message from AIO CRM. Please do not reply directly to this email.</p>
                <p>&copy; {os.getenv('YEAR', '2026')} AIO CRM Systems. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text = f"""
{title}
--------------------------------------------------

{content_text}

--------------------------------------------------
This is an automated message from AIO CRM. Please do not reply directly to this email.
(c) AIO CRM Systems. All rights reserved.
    """
    return html, text

def send_email(to_email: str, subject: str, title: str, content_html: str, content_text: str):
    if not SMTP_USER or not SMTP_PASSWORD:
        print(f"Skipping email to {to_email} due to missing SMTP credentials.")
        print(f"Subject: {subject}\nText Body:\n{content_text}")
        return False
        
    try:
        # Create a multipart/alternative message
        msg = MIMEMultipart('alternative')
        msg['From'] = f"AIO CRM <{EMAIL_FROM}>"
        msg['To'] = to_email
        msg['Subject'] = subject
        msg['Reply-To'] = REPLY_TO
        
        html_body, text_body = get_email_template(title, content_html, content_text)
        
        # Attach parts into message container.
        # According to RFC 2046, the last part of a multipart message, in this case
        # the HTML message, is best and preferred.
        part1 = MIMEText(text_body, 'plain')
        part2 = MIMEText(html_body, 'html')
        
        msg.attach(part1)
        msg.attach(part2)
        
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")
        return False

def send_new_account_email(to_email: str, name: str, password: str, login_url: str):
    subject = "Welcome to AIO CRM - Your Account Setup is Complete"
    title = f"Welcome, {name}!"
    
    content_html = f"""
        <p>Your account has been successfully provisioned by the administrator.</p>
        <p>You can now access the system using the following details:</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Login URL:</strong> <a href="{login_url}" style="color: #0d6efd; text-decoration: none;">{login_url}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> {to_email}</p>
            <p style="margin: 0;"><strong>Temporary Password:</strong> <span style="font-family: monospace; background: #e9ecef; padding: 2px 6px; border-radius: 3px;">{password}</span></p>
        </div>
        <p>For your security, please log in and change your password immediately.</p>
    """
    
    content_text = f"""
Your account has been successfully provisioned by the administrator.
You can now access the system using the following details:

Login URL: {login_url}
Email: {to_email}
Temporary Password: {password}

For your security, please log in and change your password immediately.
    """
    
    return send_email(to_email, subject, title, content_html, content_text)

def send_otp_email(to_email: str, otp: str):
    subject = "AIO CRM - Password Reset Verification Code"
    title = "Password Reset Request"
    
    content_html = f"""
        <p>We received a request to reset the password for your account.</p>
        <p>Your verification code is:</p>
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0d6efd; background: #f8f9fa; padding: 15px 30px; border-radius: 8px; border: 1px solid #dee2e6;">{otp}</span>
        </div>
        <p>This code is valid for 15 minutes. If you did not request a password reset, please ignore this email.</p>
    """
    
    content_text = f"""
We received a request to reset the password for your account.

Your verification code is: {otp}

This code is valid for 15 minutes. If you did not request a password reset, please ignore this email.
    """
    
    return send_email(to_email, subject, title, content_html, content_text)

def send_password_changed_by_admin_email(to_email: str, name: str, new_password: str, login_url: str):
    subject = "AIO CRM - Security Notice: Your Password Has Been Updated"
    title = f"Hello {name},"
    
    content_html = f"""
        <p>This is a security notification to inform you that your account password has been updated by an administrator.</p>
        <p>You can log in using your new credentials:</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0d6efd;">
            <p style="margin: 0 0 10px 0;"><strong>Login URL:</strong> <a href="{login_url}" style="color: #0d6efd; text-decoration: none;">{login_url}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> {to_email}</p>
            <p style="margin: 0;"><strong>New Password:</strong> <span style="font-family: monospace; background: #e9ecef; padding: 2px 6px; border-radius: 3px;">{new_password}</span></p>
        </div>
        <p>We recommend logging in now to ensure everything is working correctly.</p>
    """
    
    content_text = f"""
This is a security notification to inform you that your account password has been updated by an administrator.
You can log in using your new credentials:

Login URL: {login_url}
Email: {to_email}
New Password: {new_password}

We recommend logging in now to ensure everything is working correctly.
    """
    
    return send_email(to_email, subject, title, content_html, content_text)
