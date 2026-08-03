import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
EMAIL_FROM = os.getenv("EMAIL_FROM", "noreply@aiocrm.com")

def send_email(to_email: str, subject: str, html_body: str):
    if not SMTP_USER or not SMTP_PASSWORD:
        print(f"Skipping email to {to_email} due to missing SMTP credentials.")
        print(f"Subject: {subject}\nBody:\n{html_body}")
        return False
        
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_FROM
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(html_body, 'html'))
        
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
    subject = "Welcome to AIO CRM - Your Account Details"
    body = f"""
    <html>
      <body>
        <h2>Welcome {name}!</h2>
        <p>Your account has been created successfully.</p>
        <p><strong>Login URL:</strong> <a href="{login_url}">{login_url}</a></p>
        <p><strong>Email:</strong> {to_email}</p>
        <p><strong>Password:</strong> {password}</p>
        <p>Please log in and change your password immediately.</p>
      </body>
    </html>
    """
    return send_email(to_email, subject, body)

def send_otp_email(to_email: str, otp: str):
    subject = "AIO CRM - Password Reset OTP"
    body = f"""
    <html>
      <body>
        <h2>Password Reset</h2>
        <p>Your OTP for password reset is: <strong>{otp}</strong></p>
        <p>This OTP is valid for 15 minutes.</p>
      </body>
    </html>
    """
    return send_email(to_email, subject, body)
