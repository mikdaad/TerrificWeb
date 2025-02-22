export async function getUser() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        cache: "no-store", // Ensure fresh data
      });
  
      if (!res.ok) {
        return null;
      }
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
  