import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getStoredAdmin() {
  const adminData = localStorage.getItem('adminUser');
  return adminData ? JSON.parse(adminData) : null;
}

export function storeAdmin(adminData: any) {
  localStorage.setItem('adminUser', JSON.stringify(adminData));
}

export function clearAdmin() {
  localStorage.removeItem('adminUser');
}

export function isAuthenticated(): boolean {
  return !!getStoredAdmin();
}
