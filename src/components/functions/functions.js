  export function isAdmin(role) {
    return role.some((role) => role == "admin");
  }