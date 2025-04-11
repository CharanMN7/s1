"use client";
import { useEffect, useState } from "react";
import S1BaseLayout from "../../s1-base-layout";
import DottedSeparator from "@/components/dotted-separator";
import { ProfileCard } from "@/components/profile-card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { apiClient } from "@/lib/api-client";
import { UserDetails } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Page({ params }: { params: { username: string } }) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setError(null);
        const data = await apiClient.getUserProfile(params.username);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error instanceof Error ? error.message : "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [params.username]);

  if (loading) {
    return (
      <S1BaseLayout>
        <LoadingSpinner size="70vh" />
      </S1BaseLayout>
    );
  }

  if (error) {
    return (
      <S1BaseLayout>
        <div className="max-w-md mx-auto mt-8">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </S1BaseLayout>
    );
  }

  return (
    <S1BaseLayout>
      <ProfileCard
        userdetails={
          userDetails || {
            id: 0,
            name: "",
            gender: "",
            username: "",
            country: "",
            linkedin: "",
            github: "",
            club: "",
            vibe: "",
            pd2repo: "",
            pd2site: "",
            pd1repo: "",
            pd1site: "",
            rdcrepo: "",
            rdcsite: "",
            d14repo: "",
            d14site: "",
            d12repo2: "",
            d12repo1: "",
            d12site2: "",
            d12site1: "",
          }
        }
      />
      <DottedSeparator />
    </S1BaseLayout>
  );
}
