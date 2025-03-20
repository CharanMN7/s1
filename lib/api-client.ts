import { UserDetails, Finisher, Leads } from "@/types";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new ApiError(response.status, error.error || "Failed to fetch data");
  }
  return response.json();
}

export const apiClient = {
  async getUserProfile(username: string): Promise<UserDetails> {
    const response = await fetch(`/api/get-userprofile?username=${username}`);
    return handleResponse<UserDetails>(response);
  },

  async getFinishers(): Promise<Finisher[]> {
    const response = await fetch("/api/get-finishers");
    return handleResponse<Finisher[]>(response);
  },

  async getLeadsInfo(): Promise<Leads[]> {
    const response = await fetch("/api/get-leads-info");
    return handleResponse<Leads[]>(response);
  },
};
