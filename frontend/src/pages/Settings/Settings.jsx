import { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiLock, FiBell, FiUsers } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Avatar from "@/components/common/Avatar/Avatar";
import Badge from "@/components/common/Badge/Badge";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppearance } from "@/context/AppearanceContext";
import { classNames, getProfilePhotoUrl } from "@/utils/helpers";
import UserManagement from "@/components/users/UserManagement";
import { userService } from "@/api/services/userService";
import { authService } from "@/api/services/authService";
import { APP_CONFIG } from "@/config/appConfig";
const TABS = [
  { id: "profile",       label: "Profile",       icon: FiUser },
  { id: "security",      label: "Security",      icon: FiLock },
  { id: "notifications", label: "Notifications", icon: FiBell },
];
export default function Settings() {
  const { user, login } = useAuth();
  const { theme, setTheme } = useTheme();
  const { applyPreset } = useAppearance();
  const [tab, setTab] = useState("profile");
  
  // Profile State
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    dob: user?.dob ? user.dob.substring(0, 10) : "",
    gender: user?.gender || "",
    designation: user?.designation || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
    bank_name: user?.bank_name || "",
    account_holder_name: user?.account_holder_name || "",
    account_number: user?.account_number || "",
    ifsc_code: user?.ifsc_code || "",
    pan_number: user?.pan_number || "",
    aadhar_number: user?.aadhar_number || "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Security State
  const [passwords, setPasswords] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = async () => {
    // Validations
    if (profileData.pan_number) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      if (!panRegex.test(profileData.pan_number)) {
        return toast.error("Invalid PAN Card format (e.g., ABCDE1234F)");
      }
    }
    
    if (profileData.aadhar_number) {
      const aadharRegex = /^\d{12}$/;
      if (!aadharRegex.test(profileData.aadhar_number)) {
        return toast.error("Aadhar Number must be exactly 12 digits");
      }
    }

    try {
      setSavingProfile(true);
      const updatedUser = await userService.updateProfile(profileData);
      
      // Update local storage and context
      const currentToken = localStorage.getItem("aio_crm_token");
      login(updatedUser, currentToken);
      
      toast.success("Profile saved successfully");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setUploadingPhoto(true);
      const res = await userService.uploadPhoto(file);
      
      // Update context user with new photo
      const updatedUser = { ...user, profile_photo: res.profile_photo };
      const currentToken = localStorage.getItem("aio_crm_token");
      login(updatedUser, currentToken);
      
      toast.success("Profile photo updated");
    } catch (error) {
      toast.error("Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdatePassword = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
      return toast.error("New passwords do not match");
    }
    
    try {
      setSavingPassword(true);
      await authService.changePassword({
        current_password: passwords.current_password,
        new_password: passwords.new_password
      });
      toast.success("Password updated successfully");
      setPasswords({ current_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to update password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <>
      <PageHeader title="Settings" description="Manage your account, security and team preferences." />
      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="card p-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={classNames(
                  "d-flex align-items-center gap-2 w-100 text-start px-3 py-2 mb-1",
                  "border-0 rounded"
                )}
                style={{
                  background: tab === t.id ? "var(--color-primary-soft)" : "transparent",
                  color: tab === t.id ? "var(--color-primary)" : "var(--color-text)",
                  fontWeight: 500, fontSize: 14, transition: "background-color 150ms",
                }}
              >
                <t.icon /> {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="card p-4">
            {tab === "profile" && (
              <div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Profile</h3>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="position-relative" style={{ width: 64, height: 64 }}>
                    <Avatar 
                      name={user?.name} 
                      size={64} 
                      src={getProfilePhotoUrl(user?.profile_photo)}
                    />
                    <label 
                      htmlFor="photo-upload" 
                      className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 24, height: 24, cursor: "pointer", border: "2px solid var(--color-surface)" }}
                    >
                      <FiUser size={12} />
                    </label>
                    <input 
                      type="file" 
                      id="photo-upload" 
                      className="d-none" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{user?.name}</div>
                    <div className="text-subtle" style={{ fontSize: 13 }}>{user?.email}</div>
                    {uploadingPhoto && <small className="text-primary">Uploading...</small>}
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6"><Input label="Full name" name="name" value={profileData.name} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="Email (Read-only)" defaultValue={user?.email} disabled /></div>
                  <div className="col-md-6"><Input label="Phone" name="phone" value={profileData.phone} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="Role (Read-only)" defaultValue={user?.role} disabled /></div>
                  <div className="col-md-6"><Input label="Date of Birth" type="date" name="dob" value={profileData.dob} onChange={handleProfileChange} /></div>
                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500 }}>Gender</label>
                    <select className="form-select" name="gender" value={profileData.gender} onChange={handleProfileChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      
                    </select>
                  </div>
                  
                  <div className="col-12 mt-4 pt-2 border-top">
                    <h4 className="mb-3 text-primary" style={{ fontSize: "1.05rem" }}>Professional & Location</h4>
                  </div>
                  <div className="col-md-6"><Input label="Designation" name="designation" placeholder="e.g. Senior Manager" value={profileData.designation} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="City" name="city" value={profileData.city} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="State" name="state" value={profileData.state} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="Country" name="country" value={profileData.country} onChange={handleProfileChange} /></div>
                  
                  <div className="col-12 mt-4 pt-2 border-top">
                    <h4 className="mb-3 text-primary" style={{ fontSize: "1.05rem" }}>Financial Details</h4>
                  </div>
                  <div className="col-md-6"><Input label="Bank Name" name="bank_name" placeholder="e.g. HDFC Bank" value={profileData.bank_name} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="Account Holder Name" name="account_holder_name" value={profileData.account_holder_name} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="Account Number" name="account_number" value={profileData.account_number} onChange={handleProfileChange} /></div>
                  <div className="col-md-6"><Input label="IFSC Code" name="ifsc_code" value={profileData.ifsc_code} onChange={handleProfileChange} /></div>
                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500 }}>PAN Card Number</label>
                    <input 
                      className="form-control" 
                      style={{ textTransform: "uppercase" }} 
                      name="pan_number" 
                      value={profileData.pan_number} 
                      onChange={handleProfileChange} 
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500 }}>Aadhar Number</label>
                    <input 
                      className="form-control" 
                      name="aadhar_number" 
                      value={profileData.aadhar_number} 
                      onChange={handleProfileChange} 
                      placeholder="123456789012"
                      maxLength={12}
                    />
                  </div>
                </div>
                <div className="mt-4 d-flex justify-content-end">
                  <Button onClick={handleSaveProfile} loading={savingProfile}>Save changes</Button>
                </div>
              </div>
            )}
            {tab === "security" && (
              <div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Security</h3>
                <Input label="Current password" type="password" name="current_password" value={passwords.current_password} onChange={handlePasswordChange} />
                <Input label="New password"     type="password" name="new_password" value={passwords.new_password} onChange={handlePasswordChange} />
                <Input label="Confirm new password" type="password" name="confirm_password" value={passwords.confirm_password} onChange={handlePasswordChange} />
                <div className="mt-3 d-flex justify-content-end">
                  <Button onClick={handleUpdatePassword} loading={savingPassword}>Update password</Button>
                </div>
              </div>
            )}
            {tab === "notifications" && (
              <div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Notifications</h3>
                {[
                  ["New lead assigned to me",     true ],
                  ["Deal stage changes",          true ],
                  ["Daily activity summary",      false],
                  ["Weekly performance report",   true ],
                  ["Product announcements",       false],
                ].map(([label, def]) => (
                  <div key={label} className="d-flex justify-content-between align-items-center py-2"
                       style={{ borderBottom: "1px solid var(--color-divider)" }}>
                    <span style={{ fontSize: 14 }}>{label}</span>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked={def} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}